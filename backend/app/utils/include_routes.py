from fastapi import FastAPI
from app.routers.file import router as file_router


def include_routes(app: FastAPI) -> None:
    app.include_router(file_router)
