from fastapi import FastAPI
from starlette.middleware.base import BaseHTTPMiddleware


class RequestLogger(BaseHTTPMiddleware):
    def __init__(self, app: FastAPI):
        self.app = app
        super().__init__()

    async def dispatch(self, request, call_next):
        # ... log request ...
        response = await call_next(request)
        # ... log response ...
        return response
