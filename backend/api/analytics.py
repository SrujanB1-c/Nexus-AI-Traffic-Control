from fastapi import APIRouter

router = APIRouter(
    prefix="/analytics"
)

@router.get("/overview")
async def overview():

    return {

        "vehicles": 12500,
        "speed": 42,
        "congestion": 31,
        "fuel_saved": 18,
        "co2_reduction": 14
    }