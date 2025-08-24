from fastapi import HTTPException, status
from fastapi.responses import JSONResponse
from sqlmodel import select, extract
from datetime import datetime, timezone
from uuid import uuid4
import json

from deps.db_session_dep import SessionDep
from deps.cache_dep import CacheDep

from models.product_model import Product, CreateProduct, UpdateProduct
from models.feedstock_model import Currency
from models.product_feedstock_model import ProductFeedstock
from models.labour_model import Labour
from schemas.pagination import Pagination

from utils.dolar_api_utils import get_dolar_current_price

def get_products(db: SessionDep, cache: CacheDep, pagination: Pagination):
    try:
        cached_list = cache.get("products_list")
    
        if cached_list:
            return JSONResponse(content=json.loads(cached_list))
        
        statement = select(Product).filter(Product.is_deleted == False).offset(pagination.page).limit(pagination.limit)
        product: list[Product] = db.exec(statement=statement).all()
        data = [p.model_dump(exclude=["is_deleted"], mode="json") for p in product]
        cache.set("products_list", json.dumps(data), ex=300)
        return JSONResponse(content=data)
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
def get_product_by_id(db: SessionDep, cache: CacheDep, id: str):
    try:
        cached_item = cache.get(f"product_{id}")

        if cached_item:
            return JSONResponse(content=json.loads(cached_item))
        
        feedstocks_found = []
        feedstock_costs = []

        this_month = datetime.now().month
        this_year = datetime.now().year

        product_statement = select(Product).where(Product.id == id, Product.is_deleted == False)
        product_found: Product = db.exec(statement=product_statement).first()

        labour_statement = select(Labour).where(
            extract('month', Labour.date) == this_month,
            extract('year', Labour.date) == this_year
        )
        
        labour_found = db.exec(statement=labour_statement).first()
        labour_found_json = labour_found.model_dump(
            mode="json",
            exclude=["id", "date", "historial_id", "historial", "is_deleted"]
        ) if labour_found else None

        amount_per_hour = int(labour_found_json["salary"]) / int(labour_found_json["hours"]) if labour_found_json is not None else 0
        amount_per_minutes = amount_per_hour / 60

        if not product_found:
            raise HTTPException(status_code=404, detail="Product not found")
        
        for fs in product_found.feedstocks:
            product_feedstock_statement = select(ProductFeedstock).where(ProductFeedstock.feedstock_id == fs.id)
            product_feedstock_found = db.exec(product_feedstock_statement).first()
            feedstock_json = fs.model_dump(
                mode="json",
                exclude=["created_at", "updated_at", "is_deleted", "provider"]
            )
            product_feedstock_json = product_feedstock_found.model_dump(mode="json")
            feedstocks_found.append({
                **feedstock_json, 
                "quantity_required": product_feedstock_json["quantity_required"]
            })

            if feedstock_json["currency"] == Currency.USD:
                dolar = get_dolar_current_price()
                feedstock_cost = float(feedstock_json['unit_cost']) * dolar["price"] * float(product_feedstock_json["quantity_required"])
                feedstock_costs.append(feedstock_cost)
            else:
                feedstock_cost = float(feedstock_json['unit_cost']) * float(product_feedstock_json["quantity_required"])
                feedstock_costs.append(feedstock_cost)

        data = {
            **product_found.model_dump(exclude=["is_deleted"], mode="json"), 
            "subtotal": sum(feedstock_costs), 
            "feedstocks": feedstocks_found,
            "labour_costs": round((amount_per_minutes * int(product_found.model_dump()["labour_time"])), 2)
        }

        cache.set(f"product_{id}", json.dumps(data), ex=120)

        return JSONResponse(content=data)
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def create_product(db: SessionDep, cache: CacheDep, body: CreateProduct):
    try:
        statement = select(Product).where(Product.sku == body.sku)
        existing_product = db.exec(statement=statement).first()
        if existing_product:
            raise HTTPException(
                status_code=409,
                detail="Product with this sku already exists"
            )
        
        product_id = uuid4()
        product_data = body.model_dump(exclude={"feedstocks"})
        product = Product.model_validate({**product_data, "id": product_id, "sku": str(product_data["sku"]).upper()})
        db.add(product)
        db.commit()

        for fs in body.model_dump()['feedstocks']:
            link = ProductFeedstock(
                product_id=product_id,
                feedstock_id=fs['feedstock_id'],
                quantity_required=fs['quantity_required']
            )

            db.add(link)

        db.commit()

        cached_list = cache.get("products_list")

        if cached_list:
            cache.delete("products_list")
    
        return {"message": "Product successfully created!"}

    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def update_product(db: SessionDep, cache: CacheDep, id: str, body: UpdateProduct): # type: ignore
    try:
        product_found = db.get(Product, id)
        data = body.model_dump(exclude_unset=True)
        sku = str(data["sku"]).upper() if data.get("sku") else product_found.model_dump()['sku']
        if product_found is None:
            raise HTTPException(status_code=404, detail="Product not found")
        product_found.sqlmodel_update({**data, "sku": sku, "updated_at": datetime.now(timezone.utc) })
        db.add(product_found)

        delete_feedstocks = data.get('delete_feedstocks')
        if delete_feedstocks and len(delete_feedstocks) >= 1:
            for fs_id in delete_feedstocks:
                statement = select(ProductFeedstock).where(ProductFeedstock.feedstock_id == fs_id)
                existing_link = db.exec(statement=statement).first()
                if not existing_link:
                    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Existing link not found")
                db.delete(existing_link)

        feedstocks = data.get('feedstocks')
        if feedstocks and len(feedstocks) >= 1:
            for fs in feedstocks:
                link = ProductFeedstock(
                    product_id=id,
                    feedstock_id=fs['feedstock_id'],
                    quantity_required=fs['quantity_required']
                )

                db.add(link)

        db.commit()

        cached_list = cache.get("products_list")
        cached_item = cache.get(f"product_{id}")

        if cached_list:
            cache.delete("products_list")
        
        if cached_item:
            cache.delete(f"product_{id}")
        
        return { "message": 'Product successfully updated!' }
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def delete_product(db: SessionDep, cache: CacheDep, id: str):
    try:
        product_found = db.get(Product, id)
        if product_found is None:
            raise HTTPException(status_code=404, detail="Product not found")
        product_found.sqlmodel_update({ "is_deleted": True })
        db.add(product_found)
        db.commit()

        cached_list = cache.get("products_list")
        cached_item = cache.get(f"product_{id}")

        if cached_list:
            cache.delete("products_list")
        
        if cached_item:
            cache.delete(f"product_{id}")

        return { "message": 'Product successfully deleted!' }
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
