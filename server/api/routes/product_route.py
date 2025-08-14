from fastapi import APIRouter, Query
from schemas.http_response import Response
from services import product_service 
from deps.db_session_dep import SessionDep
from deps.jwt_dep import JwtDep
from schemas.pagination import Pagination
router = APIRouter(
  tags=['Product'],
  prefix='/product'
)

@router.get("", summary="Get Products", responses={
    200: Response(
        description="Succesfully Response",
        content_type="application/json",
        message="Succesfully Response"
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
    ).custom_response(), 
})
def get_products(db: SessionDep, pagination: Pagination = Query()):
    return product_service.get_products(db=db, pagination=pagination)


@router.post("", summary="Create Products", responses={
    201: Response (
        description="Product Created.",
        content_type="application/json",
        message="Product Created."
    ).custom_response(), 
    400:
    Response (
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


}) 

def post_products(db: SessionDep, pagination: Pagination, jwt: JwtDep):
    return product_service.create_product(db=db, pagination=pagination)

@router.put("", summary="Update Products", responses={
    200: Response(
        description="Product Updated.",
        content_type="application/json",
        message="Product Updated"
    ).custom_response(),
     400:
    Response (
        description="Bad Request",
        content_type="application/json",
        message="Bad Request"
    ).custom_response(),
     404: Response(
        description="Product Not Found",
        content_type="application/json",
        message="Product Not Found"
    ).custom_response(),
    403:Response(
        description="Forbidden",
        content_type="application/json",
        message="Forbidden"
    ).custom_response(),
       500: Response(
        description="Internal Server Error", 
        content_type="application/json",
        message="Internal Server Error"
    ).custom_response(), 
}) 

def put_products(db: SessionDep, pagination: Pagination, jwt: JwtDep):
     return product_service.update_product(db=db, pagination=pagination)

@router.delete("", summary="Delete Products", responses={
     200: Response(
        description="Product Deleted",
        content_type="application/json",
        message="Product Deleted"
    ).custom_response(),
    404: Response(
        description="Product Not Found",
        content_type="application/json",
        message="Product Not Found"
    ).custom_response(),
    403:Response(
        description="Forbidden",
        content_type="application/json",
        message="Forbidden"
    ).custom_response(),
     500: Response(
        description="Internal Server Error", 
        content_type="application/json",
        message="Internal Server Error"
    ).custom_response(), 
}) 

def delete_products(db: SessionDep, pagination: Pagination, jwt: JwtDep):
    return product_service.delete_product(db=db, pagination=pagination)