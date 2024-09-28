from fastapi import HTTPException
from app.constants.validation import ALLOWED_EXTENSIONS
from app.constants.errors import file_errors


def validate_extension(extension: str) -> None:
    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=file_errors["WRONG_EXTENSION"](ALLOWED_EXTENSIONS)
        )
