from fastapi import UploadFile, HTTPException
from app.utils.file import validate_extension, process_json, process_csv
import pandas as pd


class FileService:
    @staticmethod
    async def process_file(file: UploadFile) -> pd.DataFrame:
        """
        Processes the uploaded file based on its type
        :param file: File to process
        :return: Processed data (as a DataFrame for CSV or dict for JSON)
        """

        file_extension = file.filename.split('.')[-1].lower()
        validate_extension(file_extension)

        file_content = await file.read()

        if file_extension == "json":
            data = process_json(file_content)
        elif file_extension == "csv":
            data = process_csv(file_content)
        else:
            raise HTTPException(
                status_code=400,
                detail="Could not process file's extension"
            )

        return data

