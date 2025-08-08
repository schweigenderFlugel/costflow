from typing import List

from fastapi import APIRouter, Body, Query

from models.feedstock_model import Feedstock, CreateFeedstock, UpdateFeedstock

from services import feedstock_service

from schemas.http_response import Response
from schemas.pagination import Pagination

from deps.db_session_dep import SessionDep
from deps.jwt_dep import JwtDep
from deps.admin_role_dep import AdminRoleDep


router = APIRouter(
  tags=['Feedstocks'],
  prefix='/feedstocks'
)

@router.get("",
  status_code=200,
  tags=['Feedstocks'], 
  summary='Get a list of feedstocks',
  response_model=List[Feedstock],
  responses={
    500: Response(
      description='Unexpected error has ocurred', 
      content_type='application/json',
      message="Unexpected internal server error"
    ).custom_response(),
  },            
)
def get_feedstocks(session: SessionDep, jwt: JwtDep, adminRole: AdminRoleDep, pagination: Pagination = Query()):
  return feedstock_service.get_feedstocks(db=session, pagination=pagination)

@router.get("/{id}",
  status_code=200,
  tags=['Feedstocks'], 
  summary='Get a feedstock',
  response_model=Feedstock,
  responses={
    500: Response(
      description='Unexpected error has ocurred', 
      content_type='application/json',
      message="Unexpected internal server error"
    ).custom_response(),
  },            
)
def get_feedstock_by_id(session: SessionDep, jwt: JwtDep, adminRole: AdminRoleDep, id: str):
  return feedstock_service.get_feedstock_by_id(db=session, id=id)

@router.post("",
  status_code=201,
  tags=['Feedstocks'],
  summary='Create a feedstock',
  responses={
    201: Response(
      description='Feedstock successfully created',
      content_type='application/json',
      message='Feedstock successfully created!',
    ).custom_response(),
    401: Response(
      description='Invalid or expired creadentials', 
      content_type='application/json',
      message='Credentials are invalid or expired',
    ).custom_response(),
    403: Response(
      description='Not allowed because invalid role', 
      content_type='application/json',
      message='Not allowed',
    ).custom_response(),
    500: Response(
      description='Unexpected error has ocurred', 
      content_type='application/json',
      message="Unexpected internal server error"
    ).custom_response(),
  },            
)
def create_feedstock(session: SessionDep, jwt: JwtDep, admin: AdminRoleDep, body: CreateFeedstock = Body()):
  return feedstock_service.create_feedstock(db=session, body=body,)

@router.put("/{id}",
  status_code=201,
  tags=['Feedstocks'], 
  summary='Update a feedstock',
  responses={
    201: Response(
      description='Feedstock successfully updated',
      content_type='application/json',
      message='Feedstock successfully updated!',
    ).custom_response(),
    403: Response(
      description='Not allowed because invalid role', 
      content_type='application/json',
      message='Not allowed',
    ).custom_response(),
    401: Response(
      description='Invalid or expired creadentials', 
      content_type='application/json',
      message='Credentials are invalid or expired',
    ).custom_response(),
    500: Response(
      description='Unexpected error has ocurred', 
      content_type='application/json',
      message="Unexpected internal server error"
    ).custom_response(),
  },            
)
def update_feedstock(session: SessionDep, jwt: JwtDep, adminRole: AdminRoleDep, id: str, body: UpdateFeedstock = Body()): # type: ignore
  return feedstock_service.update_feedstock(db=session, id=id, body=body)

@router.delete("/{id}",
  status_code=201,
  tags=['Feedstocks'], 
  summary='Delete a feedstock',
  responses={
    201: Response(
      description='Feedstock successfully deleted',
      content_type='application/json',
      message='Feedstock successfully deleted!',
    ).custom_response(),
    401: Response(
      description='Invalid or expired creadentials', 
      content_type='application/json',
      message='Credentials are invalid or expired',
    ).custom_response(),
    403: Response(
      description='Not allowed because invalid role', 
      content_type='application/json',
      message='Not allowed',
    ).custom_response(),
    500: Response(
      description='Unexpected error has ocurred', 
      content_type='application/json',
      message="Unexpected internal server error"
    ).custom_response(),
  },            
)
def delete_feedstock(session: SessionDep, jwt: JwtDep, adminRole: AdminRoleDep, id: str):
  return feedstock_service.delete_feedstock(db=session, id=id)