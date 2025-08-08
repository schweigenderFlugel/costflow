from typing import List

from fastapi import APIRouter, Request

from models.auth_model import User

from services import user_service

from schemas.http_response import Response

from deps.db_session_dep import SessionDep
from deps.jwt_dep import JwtDep
from deps.admin_role_dep import AdminRoleDep


router = APIRouter(
  tags=['Users'],
  prefix='/users'
)

@router.get("/me",
  status_code=200,
  tags=['Users'], 
  summary='Get current user',
  response_model=User,
  responses={
    401: Response(
      description='Invalid or expired creadentials', 
      content_type='application/json',
      message='CRedentials are invalid or expired',
    ).custom_response(),
    500: Response(
      description='Unexpected error has ocurred', 
      content_type='application/json',
      message="Unexpected internal server error"
    ).custom_response(),
  },            
)
def get_current_user(request: Request, jwt: JwtDep, session: SessionDep):
  user_id = request.state.user['sub']
  return user_service.get_current_user(session, user_id)

@router.get("",
  status_code=200,
  tags=['Users'], 
  summary='Get all the users',
  response_model=List[User],
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
    500: Response(
      description='Unexpected error has ocurred', 
      content_type='application/json',
      message="Internal server error"
    ).custom_response(),
  },            
)
def get_all_users(session: SessionDep, jwt: JwtDep, adminRole: AdminRoleDep):
  return user_service.get_all_users(session)

@router.get("/{id}",
  status_code=200,
  tags=['Users'], 
  summary='Get user by id',
  response_model=User,
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
    500: Response(
      description='Unexpected internal error has ocurred', 
      content_type='application/json',
      message="Internal server error"
    ).custom_response(),
  },            
)
def get_user_by_id(id: str, session: SessionDep, jwt: JwtDep, adminRole: AdminRoleDep):
  return user_service.get_user_by_id(db=session, user_id=id)