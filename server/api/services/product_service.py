from fastapi import HTTPException, status
from sqlmodel import select
from datetime import datetime, timezone

from deps.db_session_dep import SessionDep
from deps.jwt_dep import JwtDep

from models.product_model import Product, CreateProduct, UpdateProduct
from schemas.pagination import Pagination

def get_products(db: SessionDep, pagination: Pagination):
    try:
        product: list[Product] = db.exec(select(Product).filter(Product.is_deleted == False).offset(pagination.page).limit(pagination.limit)).all()
        return [p.model_dump() for p in product]
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)
    
    
def get_product_by_id(db: SessionDep, id: str):
    try:
        product_found: Product = db.exec(select(Product).where(Product.id == id)).first()
        if not product_found:
            raise HTTPException(status_code=404, detail="Product not found")
        return product_found.model_dump()
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)

def create_product(db: SessionDep, body: CreateProduct):
    try:
        existing_product = db.exec(
            select(Product).where(Product.name == body.name)
        ).first()
        if existing_product:
            raise HTTPException(
                status_code=409,
                detail="Product with this name already exists"
            )
        data = body.model_dump()
        product = Product.model_validate(data)
        db.add(product)
        db.commit()
        db.refresh(product)
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
        db.commit()
        db.refresh(product_found)
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
