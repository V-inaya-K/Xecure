from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from processing.pipeline import analyze_image

app = FastAPI(title="AI Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class ImagePayload(BaseModel):
    image_base64: str

@app.post("/analyze")
async def analyze(payload: ImagePayload):
    return analyze_image(payload.image_base64)
