from typing import List
from fastapi import APIRouter, Query, Body
from schemas.http_response import Response

from deps.db_session_dep import SessionDep
from deps.jwt_dep import JwtDep
from deps.admin_role_dep import AdminRoleDep
from deps.cache_dep import CacheDep

from schemas.pagination import Pagination
from services import indirect_cost_service

from models.indirect_cost_model import CreateIndirectCost, UpdateIndirectCost
from schemas.indirect_costs_response import IndirectCost, IndirectCostsList, CurrentIndirectCosts

router = APIRouter(
    tags=['Indirect Costs'],
    prefix='/indirect-costs'
)

@router.get("", 
    summary="Get Indirect Costs",
    response_model=List[IndirectCostsList],
    responses={
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
    }
)
def get_indirect_costs(db: SessionDep, jwt: JwtDep, admin: AdminRoleDep,  pagination: Pagination = Query()):
    return indirect_cost_service.get_indirect_cost(db=db, pagination=pagination)

@router.get("/current", 
    summary="Get current indirect cost",
    response_model=List[CurrentIndirectCosts],
    responses={
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
            description="Indirect costs not found",
            content_type="application/json",
            message="Labour info not found"
        ).custom_response(),
        500: Response(
            description="Internal Server Error",
            content_type="application/json",
            message="Internal Server Error"
        ).custom_response(),
    }
)
def get_current_labour(db: SessionDep, cache: CacheDep, jwt: JwtDep, admin: AdminRoleDep):
    return indirect_cost_service.get_current_indirect_costs(db=db, cache=cache)

@router.get("/{id}", 
    summary="Get indirect costs by id",
    response_model=IndirectCost,
    responses={
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
    }
)
def get_indirect_cost_by_id(db: SessionDep, cache: CacheDep, jwt: JwtDep, admin: AdminRoleDep, id: str):
    return indirect_cost_service.get_indirect_cost_by_id(db=db, cache=cache, id=id)

@router.post("", 
    summary="Create Indirect Cost", 
    responses={
        201: Response(
            description="IndirectCost Created",
            content_type="application/json",
            message="IndirectCost Created"
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
        400: Response(
            description="Bad Request",
            content_type="application/json",
            message="Bad Request"
        ).custom_response(),
        500: Response(
            description="Internal Server Error",
            content_type="application/json",
            message="Internal Server Error"
        ).custom_response(),
    }
)
def create_indirect_cost(db: SessionDep, cache: CacheDep, jwt: JwtDep, admin: AdminRoleDep, body: CreateIndirectCost = Body()):
    return indirect_cost_service.create_indirect_cost(db=db, cache=cache, body=body)

@router.put("/{id}",
    summary="Update Indirect Cost", 
    responses={
        200: Response(
            description="IndirectCost Updated",
            content_type="application/json",
            message="IndirectCost Updated"
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
            description="IndirectCost Not Found",
            content_type="application/json",
            message="IndirectCost Not Found"
        ).custom_response(),
        500: Response(
            description="Internal Server Error",
            content_type="application/json",
            message="Internal Server Error"
        ).custom_response(),
    }
)
def update_indirect_cost(db: SessionDep, cache: CacheDep, jwt: JwtDep, admin: AdminRoleDep, id: str, body: UpdateIndirectCost = Body()): # type: ignore
    return indirect_cost_service.update_indirect_cost(db=db, cache=cache, id=id, body=body)

@router.delete("/{id}",
    summary="Delete Indirect Cost", 
    responses={
        200: Response(
            description="IndirectCost Deleted",
            content_type="application/json",
            message="IndirectCost Deleted"
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
            description="IndirectCost Not Found",
            content_type="application/json",
            message="IndirectCost Not Found"
        ).custom_response(),
        500: Response(
            description="Internal Server Error",
            content_type="application/json",
            message="Internal Server Error"
        ).custom_response(),
    }
)
def delete_indirect_cost(db: SessionDep, cache: CacheDep, jwt: JwtDep, admin: AdminRoleDep, id: str):
    return indirect_cost_service.delete_indirect_cost(db=db, cache=cache, id=id)
