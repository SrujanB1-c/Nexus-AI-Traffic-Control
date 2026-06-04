import json
from fastapi import WebSocket

class BroadcastManager:

    def __init__(self):

        self.connections = []

    async def connect(
        self,
        websocket: WebSocket
    ):

        await websocket.accept()

        self.connections.append(
            websocket
        )

    def disconnect(
        self,
        websocket: WebSocket
    ):

        if websocket in self.connections:

            self.connections.remove(
                websocket
            )

    async def broadcast(
        self,
        payload
    ):

        disconnected = []

        for connection in self.connections:

            try:

                await connection.send_text(
                    json.dumps(payload)
                )

            except Exception:

                disconnected.append(
                    connection
                )

        for d in disconnected:

            self.disconnect(d)

manager = BroadcastManager()