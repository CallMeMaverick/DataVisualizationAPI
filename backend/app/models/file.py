from pydantic import BaseModel


class FileUploadResponse(BaseModel):
    path: str
