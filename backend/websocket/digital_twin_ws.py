from fastapi import APIRouter
from fastapi import WebSocket

import asyncio

from services.digital_twin_engine import (
    DigitalTwinEngine
)

router = APIRouter()

engine = DigitalTwinEngine()

@router.websocket("/ws/twin")
async def twin_socket(
    websocket: WebSocket
):

    await websocket.accept()

    while True:

        data = engine.tick()

        await websocket.send_json(data)

        await asyncio.sleep(0.1)