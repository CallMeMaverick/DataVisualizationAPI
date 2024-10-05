from typing import Annotated
from fastapi import APIRouter, Body
from app.constants import chart_router
from app.models import ChartParams
from app.services import ChartService


router = APIRouter(prefix=chart_router["prefix"])


@router.post(chart_router["post"])
async def plot_simple(params: Annotated[ChartParams, Body()]):
    return ChartService.plot_simple(params)
