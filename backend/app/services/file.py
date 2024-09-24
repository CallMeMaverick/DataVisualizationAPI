import os
from fastapi import UploadFile


class FileService:
    @staticmethod
    async def save_uploaded_file(file: UploadFile) -> str:
        """
        Uploads a file and returns the path to it
        :param file: File to upload
        :return: Path to uploaded file
        """

        upload_dir = os.getenv("UPLOAD_DIR", "./files")
        file_path = os.path.join(upload_dir, file.filename)
        os.makedirs(upload_dir, exist_ok=True)

        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())

        return file_path

