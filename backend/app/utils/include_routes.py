import os
from fastapi import FastAPI
from app.routers import file_router
from app.routers import chart_router


def include_routes(app: FastAPI) -> None:
    api_prefix = os.getenv("API_PREFIX")

    app.include_router(file_router, prefix=api_prefix)
    app.include_router(chart_router, prefix=api_prefix)
