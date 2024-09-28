from typing import Dict
from fastapi import UploadFile, HTTPException
from app.utils.file import validate_extension, process_json, process_csv
from app.constants.errors import file_errors


class FileService:
    """
    A service for processing uploaded files in various formats.

    This class provides static methods for processing
    files such as CSV and JSON. It returns relevant data (e.g., column names)
    extracted from the processed file.

    Methods:
        process_file(file: UploadFile) -> Dict[str, list[str]]:
            Validates and processes the given file based on its type (CSV or JSON)
            and returns the list of columns.
    """

    @staticmethod
    async def process_file(file: UploadFile) -> Dict[str, list[str]]:
        """
        Processes the uploaded file based on its type
        :param file: File to process
        :return: Processed data (as a DataFrame for CSV or dict for JSON)
        """

        file_extension = file.filename.split('.')[-1]
        validate_extension(file_extension)

        file_content = await file.read()
        if file.content_type == "text/csv":
            df = process_csv(file_content)
        elif file.content_type == "application/json":
            df = process_json(file_content)
        else:
            raise HTTPException(
                status_code=400,
                detail=file_errors["BAD_REQUEST"]
            )

        columns = df.columns.tolist()
        return {"columns": columns}
