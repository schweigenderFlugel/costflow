from dataclasses import dataclass
from typing import Annotated
from fastapi import Depends, Cookie, HTTPException, status

from utils.jwt_utils import verify_refresh_token

from config.envs import COOKIE_NAME
from utils.jwt_utils import verify_refresh_token

@dataclass
class JwtPayload:
    sub: str

async def refresh(
    token = Cookie(default=None, alias=COOKIE_NAME)
):
    if token is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session not found",
        )
    
    payload: JwtPayload = verify_refresh_token(token)

    return payload

RefreshSessionDep = Annotated[JwtPayload, Depends(refresh)]