from typing import List
from fastapi import APIRouter, Query, Body

from schemas.http_response import Response
from services import product_service

from deps.db_session_dep import SessionDep
from deps.cache_dep import CacheDep
from deps.jwt_dep import JwtDep
from deps.admin_role_dep import AdminRoleDep

from schemas.pagination import Pagination
from models.product_model import CreateProduct, UpdateProduct

from schemas.product_response import ProductResponse

from models.product_model import Product

router = APIRouter(
  tags=['Products'],
  prefix='/products'
)

@router.get("", 
    summary='Get a list of products',
    status_code=200,
    response_model=List[Product],
    responses={
        500: Response(
            description="Internal Server Error", 
            content_type="application/json",
            message="Internal Server Error"
        ).custom_response(),
    }
)
def get_products(db: SessionDep, cache: CacheDep, pagination: Pagination = Query()):
    return product_service.get_products(db=db, cache=cache, pagination=pagination)

@router.get("/{id}", 
    summary='Get detailed info of the product', 
    status_code=200,
    response_model=ProductResponse,
    responses={
        404: Response(
            description="Product Not Found",
            content_type="application/json",
            message="Product Not Found"
        ).custom_response(),
        500: Response(
            description="Internal Server Error", 
            content_type="application/json",
            message="Internal Server Error"
        ).custom_response(),
    }
)
def get_product_by_id(db: SessionDep, cache: CacheDep, id: str):
    return product_service.get_product_by_id(db=db, cache=cache, id=id)

@router.post("", 
    summary="Create a new product",
    status_code=201,
    responses={
        201: Response (
            description="Product created",
            content_type="application/json",
            message="Product created"
        ).custom_response(), 
        400: Response (
            description="Bad Request",
            content_type="application/json",
            message="Bad Request"
        ).custom_response(),
        409: Response(
            description="Conflict",
            content_type="application/json",
            message="Conflict"
        ).custom_response(),
        500: Response(
            description="Internal Server Error", 
            content_type="application/json",
            message="Internal Server Error"
        ).custom_response(),
    }
) 
def create_product(db: SessionDep, cache: CacheDep, jwt: JwtDep, admin: AdminRoleDep, body: CreateProduct = Body()):
    return product_service.create_product(db=db, cache=cache, body=body)

@router.put("/{id}", 
    summary="Update Product",
    status_code=201,
    responses={
        201: Response(
            description="Product Updated",
            content_type="application/json",
            message="Product Updated"
        ).custom_response(),
        400: Response (
            description="Bad Request",
            content_type="application/json",
            message="Bad Request"
        ).custom_response(),
        404: Response(
            description="Product Not Found",
            content_type="application/json",
            message="Product Not Found"
        ).custom_response(),
        403: Response(
            description="Forbidden",
            content_type="application/json",
            message="Forbidden"
        ).custom_response(),
        500: Response(
            description="Internal Server Error", 
            content_type="application/json",
            message="Internal Server Error"
        ).custom_response(),
    }
) 
def update_product(db: SessionDep, cache: CacheDep, jwt: JwtDep, admin: AdminRoleDep, id: str, body: UpdateProduct = Body()): # type: ignore
    return product_service.update_product(db=db, cache=cache, id=id, body=body)

@router.delete("/{id}", 
    summary="Delete Products",
    status_code=200,
    responses={
        200: Response(
            description="Product Deleted",
            content_type="application/json",
            message="Product Deleted"
        ).custom_response(),
        403:Response(
            description="Forbidden",
            content_type="application/json",
            message="Forbidden"
        ).custom_response(),
        404: Response(
            description="Product Not Found",
            content_type="application/json",
            message="Product Not Found"
        ).custom_response(),
        500: Response(
            description="Internal Server Error", 
            content_type="application/json",
            message="Internal Server Error"
        ).custom_response()
    }
) 
def delete_product(db: SessionDep, cache: CacheDep, jwt: JwtDep, admin: AdminRoleDep, id: str):
    return product_service.delete_product(db=db, cache=cache, id=id)