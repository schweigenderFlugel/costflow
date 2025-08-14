from fastapi import APIRouter, Body, Query
from fastapi import Response as Res, Request
from datetime import datetime, timezone, timedelta

from deps.db_session_dep import SessionDep
from deps.jwt_dep import JwtDep
from deps.refresh_session_dep import RefreshSessionDep

from services import auth_service

from models.auth_model import RegisterUser, Login, UserEmail, UserPassword, ChangePassword

from schemas.jwt_response import TokenResponse
from schemas.http_response import Response

from config.envs import COOKIE_NAME

router = APIRouter(
  tags=["Auth"],
  prefix="/auth",
)

@router.post("/register", 
  status_code=201,
  tags=['Auth'], 
  summary='Register a new user',
  responses={
    201: Response(
      description='User successfully registered',
      content_type='application/json',
      message='User successfully registered!',
    ).custom_response(),
    409: Response(
      description='User already exists', 
      content_type='application/json',
      message="User already exists"
    ).custom_response(),
    500: Response(
      description='Unexpected error has ocurred', 
      content_type='application/json',
      message="Unexpected internal server error"
    ).custom_response(),
  },
)
def register(session: SessionDep, body: RegisterUser):
  return auth_service.register(db=session, body=body)

@router.post("/login",
  status_code=200,
  tags=['Auth'], 
  summary='Login',
  response_model=TokenResponse,
  responses={
    401: Response(
      description='Invalid creadentials', 
      content_type='application/json',
      message='Credentials are invalid',
    ).custom_response(),
    500: Response(
      description='Unexpected error has ocurred', 
      content_type='application/json',
      message="Unexpected internal server error"
    ).custom_response(),
  },
)
def login(res: Res, session: SessionDep, body: Login = Body()):
  tokens = auth_service.login(db=session, body=body)
  res.set_cookie(
    key=COOKIE_NAME,
    value=tokens['refresh_token'],
    httponly=True, 
    secure=False, 
    samesite='none',
    expires=(datetime.now(timezone.utc) + timedelta(hours=2))
  )
  return { "access_token": tokens['access_token'] }

@router.get("/refresh",
  status_code=200,
  tags=['Auth'], 
  summary='Refresh session',
  response_model=TokenResponse,
  responses={
    401: Response(
      description='Session not found', 
      content_type='application/json',
      message='Session not found',
    ).custom_response(),
    500: Response(
      description='Unexpected error has ocurred', 
      content_type='application/json',
      message="Internal server error"
    ).custom_response(),
  },
)
def refresh(res: Res, session: SessionDep, payload: RefreshSessionDep):
  res.delete_cookie(
    key=COOKIE_NAME, 
    httponly=True, 
    secure=False, 
    samesite='none',
  )
  tokens = auth_service.refresh(db=session, payload=payload)
  res.set_cookie(
    key=COOKIE_NAME,
    value=tokens['refresh_token'],
    httponly=True, 
    secure=False, 
    samesite='none',
    expires=(datetime.now(timezone.utc) + timedelta(hours=2))
  )
  return { "access_token": tokens['access_token'] }

@router.get("/logout",
  status_code=200,
  tags=['Auth'], 
  summary='Logout',
  responses={
    201: Response(
      description='Successfully logged out',
      content_type='application/json',
      message='Successfully logged out',
    ).custom_response(),
    401: Response(
      description='Session not found', 
      content_type='application/json',
      message='Session not found',
    ).custom_response(),
    500: Response(
      description='Unexpected error has ocurred', 
      content_type='application/json',
      message="Internal server error"
    ).custom_response(),
  },
)
def logout(res: Res, payload: RefreshSessionDep):
  res.delete_cookie(
    key=COOKIE_NAME, 
    httponly=True, 
    secure=False, 
    samesite='none',
  )
  return { "message": "Sucessfully logged out" }

@router.post('/recover-password', 
  status_code=200,
  tags=['Auth'], 
  summary='Password Recovery',
  responses={
    201: Response(
      description='Email for recovery successfully sent',
      content_type='application/json',
      message='Email for recovery successfully sent!',
    ).custom_response(),
    404: Response(
      description='User not found', 
      content_type='application/json',
      message='User not found',
    ).custom_response(),
    500: Response(
      description='Unexpected error has ocurred', 
      content_type='application/json',
      message="Unexpected internal server error"
    ).custom_response(),
  },
)
def recover_password(session: SessionDep, body: UserEmail):
  return auth_service.recover_password(db=session, body=body)

@router.put('/change-password', 
  status_code=201,
  tags=['Auth'], 
  summary='Password Change',
  responses={
    201: Response(
      description='Change password',
      content_type='application/json',
      message='Password successfully changed!',
    ).custom_response(),
    404: Response(
      description='User not found', 
      content_type='application/json',
      message='User not found',
    ).custom_response(),
    500: Response(
      description='Unexpected error has ocurred', 
      content_type='application/json',
      message="Unexpected internal server error"
    ).custom_response(),
  },
)
def change_password(session: SessionDep, jwt: JwtDep, request: Request, body: ChangePassword = Body()):
  user_id = request.state.user['sub']
  return auth_service.change_password(db=session, user_id=user_id, body=body)

@router.put('/reset-password',
  status_code=201,
  tags=['Auth'], 
  summary='Password Reset',
  responses={
    201: Response(
      description='Reset password',
      content_type='application/json',
      message='Password successfully reset!',
    ).custom_response(),
    401: Response(
      description='Invalid creadentials', 
      content_type='application/json',
      message='Credentials are invalid',
    ).custom_response(),
    404: Response(
      description='User not found', 
      content_type='application/json',
      message='User not found',
    ).custom_response(),
    500: Response(
      description='Unexpected error has ocurred', 
      content_type='application/json',
      message="Unexpected internal server error"
    ).custom_response(),
  },            
)
def reset_password(session: SessionDep, code: str = Query(), body: UserPassword = Body()):
  return auth_service.reset_password(db=session, encrypted_code=code, body=body)