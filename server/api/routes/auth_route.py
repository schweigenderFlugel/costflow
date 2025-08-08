from fastapi import APIRouter, Body
from fastapi import Response as Res
from datetime import datetime, timezone, timedelta

from deps.db_session_dep import SessionDep
from deps.refresh_session_dep import RefreshSessionDep

from services import auth_service

from models.auth_model import RegisterUser, Login

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