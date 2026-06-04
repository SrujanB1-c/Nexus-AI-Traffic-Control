from fastapi import APIRouter, WebSocket
from services.traffic_engine import TrafficEngine
import asyncio

router = APIRouter()

engine = TrafficEngine()

@router.websocket("/ws/traffic")
async def traffic_stream(websocket: WebSocket):

    await websocket.accept()

    while True:

        data = engine.generate()

        await websocket.send_json(data)

        await asyncio.sleep(1)