from fastapi import HTTPException, status
from sqlmodel import select
from sqlalchemy.orm import selectinload
from datetime import datetime, timezone
from uuid import uuid4

from deps.db_session_dep import SessionDep

from models.product_model import Product, CreateProduct, UpdateProduct
from models.feedstock_model import Currency
from models.product_feedstock_model import ProductFeedstock
from schemas.pagination import Pagination

from utils.dolar_api_utils import get_dolar_current_price

def get_products(db: SessionDep, pagination: Pagination):
    try:
        statement = select(Product).filter(Product.is_deleted == False).offset(pagination.page).limit(pagination.limit)
        product: list[Product] = db.exec(statement=statement).all()
        return [p.model_dump() for p in product]
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)
    
def get_product_by_id(db: SessionDep, id: str):
    try:
        feedstocks_found = []
        feedstock_costs = []
        statement = select(Product).where(Product.id == id, Product.is_deleted == False)
        product_found: Product = db.exec(statement=statement).first()
        if not product_found:
            raise HTTPException(status_code=404, detail="Product not found")
        
        for fs in product_found.feedstocks:
            product_feedstock_statement = select(ProductFeedstock).where(ProductFeedstock.feedstock_id == fs.id)
            product_feedstock_found = db.exec(product_feedstock_statement).first()
            feedstock_json = fs.model_dump(exclude=["created_at", "updated_at", "is_deleted", "provider"])
            product_feedstock_json = product_feedstock_found.model_dump()
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

        return {**product_found.model_dump(exclude=["is_deleted"]), "subtotal": sum(feedstock_costs), "feedstocks": feedstocks_found}
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)

def create_product(db: SessionDep, body: CreateProduct):
    try:
        statement = select(Product).where(Product.name == body.name)
        existing_product = db.exec(statement=statement).first()
        if existing_product:
            raise HTTPException(
                status_code=409,
                detail="Product with this name already exists"
            )
        
        product_id = uuid4()
        product_data = body.model_dump(exclude={"feedstocks"})
        product = Product.model_validate({"id": product_id ,**product_data})
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
    
        return {"message": "Product successfully created!"}

    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException (
            status_code=500,
            detail=e
        )

def update_product(db: SessionDep, id: str, body: UpdateProduct): # type: ignore
    try:
        product_found = db.get(Product, id)
        data = body.model_dump(exclude_unset=True)
        if product_found is None:
            raise HTTPException(status_code=404, detail="Product not found")
        product_found.sqlmodel_update({**data, "updated_at": datetime.now(timezone.utc) })
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
        
        return { "message": 'Product successfully updated!' }
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)

def delete_product(db: SessionDep, id: str):
    try:
        product_found = db.get(Product, id)
        if product_found is None:
            raise HTTPException(status_code=404, detail="Product not found")
        product_found.sqlmodel_update({ "is_deleted": True })
        db.add(product_found)
        db.commit()
        db.refresh(product_found)
        return { "message": 'Product successfully deleted!' }
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)
