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
from models.product_indirect_costs_model import ProductIndirectCost
from models.labour_model import Labour
from models.feedstock_model import Feedstock
from models.indirect_cost_model import IndirectCost
from models.monthly_production_model import MonthlyProduction
from schemas.pagination import Pagination

from utils.dolar_api_utils import get_dolar_price
from .historial_service import get_historial_id

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
        indirect_costs_found = []
        feedstock_costs = []
        indirect_costs = []

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
                exclude=["created_at", "updated_at", "is_deleted", "provider", "historial_id", "sku"]
            )
            product_feedstock_json = product_feedstock_found.model_dump(mode="json")
            feedstocks_found.append({
                **feedstock_json, 
                "quantity_required": product_feedstock_json["quantity_required"]
            })

            if feedstock_json["currency"] == Currency.USD:
                dolar = get_dolar_price()
                feedstock_cost = float(feedstock_json['unit_cost']) * dolar["price"] * float(product_feedstock_json["quantity_required"])
                feedstock_costs.append(feedstock_cost)
            else:
                feedstock_cost = float(feedstock_json['unit_cost']) * float(product_feedstock_json["quantity_required"])
                feedstock_costs.append(feedstock_cost)

        for ic in product_found.indirect_costs:
            product_indirect_cost_statement = select(ProductIndirectCost).where(ProductIndirectCost.indirect_cost_id == ic.id)
            product_indirect_cost_found = db.exec(product_indirect_cost_statement).first()
            indirect_cost_json = ic.model_dump(mode="json", exclude=["is_deleted", "date", "historial_id", "historial"])
            product_indirect_cost_json = product_indirect_cost_found.model_dump(mode="json")
            indirect_costs_found.append({
                **indirect_cost_json, 
                "usage": product_indirect_cost_json["usage"]
            })

            usage = float(product_indirect_cost_json["usage"]) if product_indirect_cost_found.usage != None else 0
            indirect_cost = float(indirect_cost_json['amount']) / float(indirect_cost_json['total_usage']) * usage
            indirect_costs.append(indirect_cost)

        data = {
            **product_found.model_dump(exclude=["is_deleted"], mode="json"), 
            "subtotal": sum(feedstock_costs), 
            "feedstocks": feedstocks_found,
            "indirect_costs": round(sum(indirect_costs), 2),
            "labour_costs": round((amount_per_minutes * int(product_found.model_dump()["labour_time"])), 2),

        }

        cache.set(f"product_{id}", json.dumps(data), ex=120)

        return JSONResponse(content=data)
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def create_product(db: SessionDep, cache: CacheDep, body: CreateProduct):
    try:
        this_month = datetime.now().month
        this_year = datetime.now().year

        dolar = get_dolar_price()
        historial_id = get_historial_id(db=db)

        product_statement = select(Product).where(Product.sku == str(body.sku).upper())
        existing_product = db.exec(statement=product_statement).first()

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

        feedstock_costs = []
        indirect_costs = []

        for fs in body.model_dump()['feedstocks']:
            feedstock = db.exec(select(Feedstock).where(Feedstock.id == fs['id'])).first()
            unit_cost = float(feedstock.model_dump()['unit_cost']) * dolar['price'] if feedstock.currency == 'USD' else float(feedstock.model_dump()['unit_cost'])
            feedstock_link = ProductFeedstock(
                product_id=product_id,
                feedstock_id=fs['id'],
                quantity_required=fs['quantity_required']
            )

            feedstock_cost = float(fs['quantity_required']) * unit_cost
            feedstock_costs.append(feedstock_cost)

            db.add(feedstock_link)
            db.commit()

        for ic in body.model_dump()['indirect_costs']:
            indirect_cost = db.exec(select(IndirectCost).where(IndirectCost.id == ic['id'])).first()
            cost_per_usage = float(indirect_cost.model_dump()['amount']) / float(indirect_cost.model_dump()['total_usage'])
            indirect_cost_link = ProductIndirectCost(
                product_id=product_id,
                indirect_cost_id=ic['id'],
                usage=ic['usage']
            )

            indirect_cost = float(ic['usage']) * cost_per_usage
            indirect_costs.append(indirect_cost)

            db.add(indirect_cost_link)
            db.commit()

        labour = db.exec(select(Labour).where(
            extract('month', Labour.date) == this_month,
            extract('year', Labour.date) == this_year)
        ).first()
        cost_per_minutes = float(labour.model_dump()['salary']) / float(labour.model_dump()['hours']) / 60

        labour_cost = round((float(body.model_dump()['labour_time']) * cost_per_minutes), 2)

        monthly_production = MonthlyProduction(
            product_name=product_data["name"],
            feedstocks_costs=sum(feedstock_costs),
            indirect_costs=sum(indirect_costs),
            labour_costs=labour_cost,
            historial_id=historial_id,
            date=datetime.now(timezone.utc)
        )

        db.add(monthly_production)
        db.commit()

        cached_list = cache.get("products_list")

        if cached_list:
            cache.delete("products_list")
    
        return {"message": "Product successfully created!"}

    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)

def update_product(db: SessionDep, cache: CacheDep, id: str, body: UpdateProduct): # type: ignore
    try:
        dolar = get_dolar_price()
        this_year = datetime.now().year
        this_month = datetime.now().month

        historial_id = get_historial_id(db=db)

        product_found = db.get(Product, id)
        data = body.model_dump(exclude_unset=True)
        sku = str(data["sku"]).upper() if data.get("sku") else product_found.model_dump()['sku']

        if product_found is None:
            raise HTTPException(status_code=404, detail="Product not found")

        delete_feedstocks = data.get('delete_feedstocks')
        if delete_feedstocks and len(delete_feedstocks) >= 1:
            for fs_id in delete_feedstocks:
                statement = select(ProductFeedstock).where(ProductFeedstock.feedstock_id == fs_id)
                existing_link = db.exec(statement=statement).first()
                if not existing_link:
                    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Existing link not found")
                db.delete(existing_link)
            db.commit()

        product_feedstocks_costs = []
        product_indirect_costs = []

        feedstocks = data.get('feedstocks')
        if feedstocks and len(feedstocks) >= 1:
            for fs in feedstocks:
                feedstock_link = ProductFeedstock(
                    product_id=id,
                    feedstock_id=fs['id'],
                    quantity_required=fs['quantity_required']
                )

                db.add(feedstock_link)
                db.commit()

        indirect_costs = data.get('indirect_costs')
        if indirect_costs and len(indirect_costs) >= 1:
            for ic in indirect_costs:
                indirect_cost = db.exec(select(IndirectCost).where(IndirectCost.id == ic['id'])).first()
                cost_per_usage = float(indirect_cost.model_dump()['amount']) / float(indirect_cost.model_dump()['total_usage'])
                indirect_cost_link = ProductIndirectCost(
                    product_id=id,
                    indirect_cost_id=ic['id'],
                    usage=ic['usage']
                )

                indirect_cost = float(ic['usage']) * cost_per_usage
                product_indirect_costs.append(indirect_cost)

                db.add(indirect_cost_link)
                db.commit()

        product_name = str(data['name']) if data.get('name') else product_found.model_dump()['name']
        labour_time = int(data['labour_time']) if data.get('labour_time') else product_found.model_dump()['labour_time']

        for fs_found in product_found.feedstocks:
            feedstock = db.exec(select(Feedstock).where(Feedstock.id == fs_found.id)).first()
            unit_cost = float(feedstock.model_dump()['unit_cost']) * dolar['price'] if feedstock.currency == 'USD' else float(feedstock.model_dump()['unit_cost'])
            product_feedstock_statement = select(ProductFeedstock).where(ProductFeedstock.feedstock_id == fs_found.id)
            product_feedstock_found = db.exec(statement=product_feedstock_statement).first()
            product_feedstock_cost = float(product_feedstock_found.model_dump()['quantity_required']) * unit_cost
            product_feedstocks_costs.append(product_feedstock_cost)

        labour = db.exec(select(Labour).where(
            extract('month', Labour.date) == this_month,
            extract('year', Labour.date) == this_year)
        ).first()

        cost_per_minutes = float(labour.model_dump()['salary']) / float(labour.model_dump()['hours']) / 60

        labour_cost = round((labour_time * cost_per_minutes), 2)

        monthly_production_statement = select(MonthlyProduction).where(
            extract('month', MonthlyProduction.date) == this_month,
            extract('year', MonthlyProduction.date) == this_year,
            MonthlyProduction.product_name == product_name
        )

        existing_monthly_production = db.exec(statement=monthly_production_statement).first()

        if not existing_monthly_production:
            monthly_production = MonthlyProduction(
                product_name=product_name,
                feedstocks_costs=sum(product_feedstocks_costs),
                indirect_costs=sum(product_indirect_costs),
                labour_costs=labour_cost,
                historial_id=historial_id,
                date=datetime.now(timezone.utc)
            )

            db.add(monthly_production)
            db.commit()

        else:
            existing_monthly_production.sqlmodel_update({
                "date": datetime.now(timezone.utc),
                "product_name": product_name,
                "feedstocks_costs": sum(product_feedstocks_costs),
                "indirect_costs": sum(product_indirect_costs),
                "labour_costs": labour_cost,
            })

            db.add(existing_monthly_production)
            db.commit()

        cached_list = cache.get("products_list")
        cached_item = cache.get(f"product_{id}")

        if cached_list:
            cache.delete("products_list")
        
        if cached_item:
            cache.delete(f"product_{id}")

        product_found.sqlmodel_update({**data, "sku": sku, "date": datetime.now(timezone.utc) })
        db.add(product_found)
        db.commit()
        
        return { "message": 'Product successfully updated!' }
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)

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
