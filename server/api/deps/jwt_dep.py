from dataclasses import dataclass
from typing import Annotated
from fastapi import Request, Security, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from utils.jwt_utils import verify_access_token
from models.auth_model import Role

@dataclass
class JwtPayload:
    sub: str
    role: Role

security = HTTPBearer(auto_error=False)

async def authenticate(
    request: Request,
    credentials: HTTPAuthorizationCredentials = Security(security)
):
    if credentials is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization token is missing",
        )
    
    token = credentials.credentials
    payload: JwtPayload = verify_access_token(token)
    
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )
    
    request.state.user = payload

JwtDep = Annotated[None, Depends(authenticate)]