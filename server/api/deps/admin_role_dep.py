from typing import Annotated
from fastapi import Request, Depends, HTTPException, status
from fastapi.security import HTTPBearer

from utils.jwt_utils import verify_access_token
from models.auth_model import Role

security = HTTPBearer()

async def verifyRole(request: Request):
    role = request.state.user['role']
    if role != Role.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not allowed",
        )
    pass

AdminRoleDep = Annotated[None, Depends(verifyRole)]