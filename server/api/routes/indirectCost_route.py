from fastapi import APIRouter, Query
from schemas.http_response import Response
from deps.db_session_dep import SessionDep
from deps.jwt_dep import JwtDep
from schemas.pagination import Pagination
from services import indirectCost_service

router = APIRouter(
 tags=['IndirectCosts'],
 prefix='/indirectcosts'
)

@router.get("", summary="Get Indirect Costs", responses={
    200: Response(
        description="Successfully Response",
        content_type="application/json",
        message="Successfully Response"
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
def get_indirect_costs(db: SessionDep, pagination: Pagination = Query()):
    return indirectCost_service.get_indirect_cost(db=db, pagination=pagination)

@router.get("/{id}", summary="Get Indirect Costs by id", responses={
    200: Response(
        description="Successfully Response",
        content_type="application/json",
        message="Successfully Response"
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
def get_indirect_cost_by_id(db: SessionDep, pagination: Pagination, jwt: JwtDep):
    return indirectCost_service.get_indirect_cost_by_id(db=db, pagination=pagination)

@router.post("", summary="Create Indirect Cost", responses={
    201: Response(
        description="IndirectCost Created",
        content_type="application/json",
        message="IndirectCost Created"
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
})
def create_indirect_cost(db: SessionDep, pagination: Pagination, jwt: JwtDep):
    return indirectCost_service.create_indirectCost(db=db, pagination=pagination)


@router.put("", summary="Update Indirect Cost", responses={
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
})
def update_indirect_cost(db: SessionDep, pagination: Pagination, jwt: JwtDep):
    return indirectCost_service.update_indirectCost(db=db, pagination=pagination)


@router.delete("", summary="Delete Indirect Cost", responses={
    200: Response(
        description="IndirectCost Deleted",
        content_type="application/json",
        message="IndirectCost Deleted"
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
})
def delete_indirect_cost(db: SessionDep, pagination: Pagination, jwt: JwtDep):
    return indirectCost_service.delete_indirectCost(db=db, pagination=pagination)
