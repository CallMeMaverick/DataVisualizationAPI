from fastapi import HTTPException
from io import BytesIO
import pandas as pd
import json


def process_json(file_content) -> pd.DataFrame:
    try:
        json_data = json.loads(file_content)
        return pd.DataFrame(json_data)
    except json.JSONDecodeError:
        raise HTTPException(
            status_code=400,
            detail="Could not parse JSON"
        )


def process_csv(file_content) -> pd.DataFrame:
    csv_data = pd.read_csv(BytesIO(file_content))
    if csv_data.empty:
        raise HTTPException(
            status_code=400,
            detail="CSV file is empty"
        )

    return csv_data
