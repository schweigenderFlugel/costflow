from typing import List
from fastapi import APIRouter, Query

from services import historial_service

from schemas.http_response import Response
from schemas.historial_response import HistorialResponse

from deps.db_session_dep import SessionDep
from deps.cache_dep import CacheDep
from deps.jwt_dep import JwtDep
from deps.admin_role_dep import AdminRoleDep

router = APIRouter(
  tags=['Historial'],
  prefix='/historial'
)

@router.get("",
  status_code=200,
  summary='Get the historial',
  response_model=List[HistorialResponse],
  responses={
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
def get_historial(session: SessionDep, cache: CacheDep, jwt: JwtDep, adminRole: AdminRoleDep):
  return historial_service.get_historial(db=session, cache=cache)

