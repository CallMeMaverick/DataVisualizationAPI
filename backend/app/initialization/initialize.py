import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.utils.include_routes import include_routes


def initialize(app: FastAPI) -> None:

    app.add_middleware(
        CORSMiddleware,
        allow_origins=[os.getenv("VITE_BASE")],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    include_routes(app)