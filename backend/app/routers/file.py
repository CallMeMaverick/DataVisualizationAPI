from fastapi import APIRouter, UploadFile
from app.constants.routers import file_router
from app.services import FileService


router = APIRouter(prefix=file_router["prefix"])


@router.post(file_router["post"])
async def upload_file(file: UploadFile):
    return await FileService.process_file(file)
