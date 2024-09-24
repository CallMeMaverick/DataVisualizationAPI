from fastapi import APIRouter, UploadFile
from app.constants.routers import file_router
from app.services.file import FileService
from app.models.file import FileUploadResponse


router = APIRouter(prefix=file_router["prefix"])


@router.post(file_router["post"], response_model=FileUploadResponse)
async def upload_file(file: UploadFile):
    filepath = await FileService.save_uploaded_file(file)
    return {"path": filepath}

