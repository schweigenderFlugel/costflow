from fastapi import APIRouter, Request
from sse_starlette import EventSourceResponse
import asyncio

from deps.jwt_dep import JwtDep
from deps.admin_role_dep import AdminRoleDep

from schemas.http_response import Response

from events import client_queues

router = APIRouter(
  tags=['Notifications'],
  prefix='/notifications'
)

@router.get("",
  status_code=200,
  tags=['Notifications'], 
  summary='Listen to SSE for notifications',
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
  }, )
async def get_notifications(request: Request):
    queue = asyncio.Queue()
    client_id = id(queue)
    client_queues[client_id] = queue

    async def event_generator():
        try:
            while True:
                if await request.is_disconnected():
                    break
                try:
                    event = await queue.get()
                    yield event
                except asyncio.CancelledError:
                    break
        finally: client_queues.pop(client_id)

    return EventSourceResponse(event_generator())
