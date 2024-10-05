from pydantic import BaseModel


class ChartParams(BaseModel):
    title: str | None = None
    xlabel: str | None = None
    ylabel: str | None = None
    x_axis: str | None = None
    y_axis: str | None = None
    chart_type: str | None = "Line"
