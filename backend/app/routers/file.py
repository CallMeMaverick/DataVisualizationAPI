from fastapi import APIRouter, UploadFile
from app.constants.routers import file_router
from app.services.file import FileService
from fastapi.responses import StreamingResponse


router = APIRouter(prefix=file_router["prefix"])


@router.post(file_router["post"])
async def upload_file(file: UploadFile):
    img_io = await FileService.process_file(file)
    return StreamingResponse(img_io, media_type="image/png")

