from fastapi import APIRouter, WebSocket

router = APIRouter()

clients = []

@router.websocket("/ws")

async def socket(ws: WebSocket):

    await ws.accept()

    clients.append(ws)

    while True:
        await ws.receive_text()