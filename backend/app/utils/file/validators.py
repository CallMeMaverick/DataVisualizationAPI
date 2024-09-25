from fastapi import HTTPException
from app.constants.validation import ALLOWED_EXTENSIONS


def validate_extension(extension: str) -> None:
    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Invalid file type. Allowed are: "
        )
