from fastapi import APIRouter, Query, Body
from schemas.http_response import Response

from deps.db_session_dep import SessionDep
from deps.jwt_dep import JwtDep
from deps.admin_role_dep import AdminRoleDep

from schemas.pagination import Pagination
from services import labour_service

from models.labour_model import CreateLabour, UpdateLabour

router = APIRouter(
 tags=['Labour'],
 prefix='/labour'
)

@router.get("", summary="Get labour info list", responses={
    200: Response(
        description="Successfully Response",
        content_type="application/json",
        message="Successfully Response"
    ).custom_response(),
    401: Response(
        description='Invalid or expired creadentials', 
        content_type='application/json',
        message='Credentials are invalid or expired',
    ).custom_response(),
    403: Response(
        description='Not allowed because invalid role', 
        content_type='application/json',
        message='Not allowed to access',
    ).custom_response(),
    404: Response(
        description="Indirect Cost Not Found",
        content_type="application/json",
        message="IndirectCost Not Found"
    ).custom_response(),
    500: Response(
        description="Internal Server Error",
        content_type="application/json",
        message="Internal Server Error"
    ).custom_response(),
})
def get_labour(db: SessionDep, jwt: JwtDep, admin: AdminRoleDep):
    return labour_service.get_labour(db=db)

@router.get("/current", summary="Get current labour info", responses={
    200: Response(
        description="Successfully Response",
        content_type="application/json",
        message="Successfully Response"
    ).custom_response(),
    401: Response(
        description='Invalid or expired creadentials', 
        content_type='application/json',
        message='Credentials are invalid or expired',
    ).custom_response(),
    403: Response(
        description='Not allowed because invalid role', 
        content_type='application/json',
        message='Not allowed to access',
    ).custom_response(),
    404: Response(
        description="Labour info not found",
        content_type="application/json",
        message="Labour info not found"
    ).custom_response(),
    500: Response(
        description="Internal Server Error",
        content_type="application/json",
        message="Internal Server Error"
    ).custom_response(),
})
def get_current_labour(db: SessionDep, jwt: JwtDep, admin: AdminRoleDep):
    return labour_service.get_current_labour(db=db)

@router.get("/{id}", summary="Get labour info by id", responses={
    200: Response(
        description="Successfully Response",
        content_type="application/json",
        message="Successfully Response"
    ).custom_response(),
    401: Response(
        description='Invalid or expired creadentials', 
        content_type='application/json',
        message='Credentials are invalid or expired',
    ).custom_response(),
    403: Response(
        description='Not allowed because invalid role', 
        content_type='application/json',
        message='Not allowed to access',
    ).custom_response(),
    404: Response(
        description="Labour info not found",
        content_type="application/json",
        message="Labour info not found"
    ).custom_response(),
    500: Response(
        description="Internal Server Error",
        content_type="application/json",
        message="Internal Server Error"
    ).custom_response(),
})
def get_labour_by_id(db: SessionDep, jwt: JwtDep, admin: AdminRoleDep, id: str):
    return labour_service.get_labour_by_id(db=db, id=id)

@router.post("", summary="Create labour info", responses={
    201: Response(
        description="Labour info created",
        content_type="application/json",
        message="IndirectCost Created"
    ).custom_response(),
    400: Response(
        description="Bad Request",
        content_type="application/json",
        message="Bad Request"
    ).custom_response(),
    401: Response(
        description='Invalid or expired creadentials', 
        content_type='application/json',
        message='Credentials are invalid or expired',
    ).custom_response(),
    403: Response(
        description='Not allowed because invalid role', 
        content_type='application/json',
        message='Not allowed to access',
    ).custom_response(),
    500: Response(
        description="Internal Server Error",
        content_type="application/json",
        message="Internal Server Error"
    ).custom_response(),
})
def create_labour(db: SessionDep, jwt: JwtDep, admin: AdminRoleDep, body: CreateLabour = Body()):
    return labour_service.create_labour(db=db, body=body)

@router.put("/{id}", summary="Update labour info", responses={
    200: Response(
        description="Labour info updated",
        content_type="application/json",
        message="Labour info updated"
    ).custom_response(),
    400: Response(
        description="Bad Request",
        content_type="application/json",
        message="Bad Request"
    ).custom_response(),
    401: Response(
        description='Invalid or expired creadentials', 
        content_type='application/json',
        message='Credentials are invalid or expired',
    ).custom_response(),
    403: Response(
        description='Not allowed because invalid role', 
        content_type='application/json',
        message='Not allowed to access',
    ).custom_response(),
    404: Response(
        description="Labour info not found",
        content_type="application/json",
        message="Labour info not found"
    ).custom_response(),
    500: Response(
        description="Internal Server Error",
        content_type="application/json",
        message="Internal Server Error"
    ).custom_response(),
})
def update_indirect_cost(db: SessionDep, jwt: JwtDep, admin: AdminRoleDep, id: str, body: UpdateLabour = Body()): # type: ignore
    return labour_service.update_labour(db=db, id=id, body=body)

@router.delete("/{id}", summary="Delete labour info", responses={
    200: Response(
        description="Labour info deleted",
        content_type="application/json",
        message="Labour info deleted"
    ).custom_response(),
    401: Response(
      description='Invalid or expired creadentials', 
      content_type='application/json',
      message='Credentials are invalid or expired',
    ).custom_response(),
    403: Response(
      description='Not allowed because invalid role', 
      content_type='application/json',
      message='Not allowed to access',
    ).custom_response(),
    404: Response(
        description="Labour info not found",
        content_type="application/json",
        message="Labour info not Found"
    ).custom_response(),
    500: Response(
        description="Internal Server Error",
        content_type="application/json",
        message="Internal Server Error"
    ).custom_response(),
})
def delete_labour(db: SessionDep, jwt: JwtDep, admin: AdminRoleDep, id: str):
    return labour_service.delete_labour(db=db, id=id)
