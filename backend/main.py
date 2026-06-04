from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from websocket.traffic_ws import router as traffic_router
from api.analytics import router as analytics_router

app = FastAPI(
    title="AI Traffic Nexus",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(traffic_router)
app.include_router(analytics_router)

@app.get("/")
async def root():
    return {
        "system": "AI Traffic Nexus",
        "status": "online"
    }