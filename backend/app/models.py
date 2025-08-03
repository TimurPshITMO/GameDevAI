from pydantic import BaseModel
from typing import Optional, List, Literal

class GenerationRequest(BaseModel):
    prompt: str
    style: Literal["realistic", "cartoon", "low-poly", "artistic"] = "realistic"
    reference_image: Optional[str] = None  # Base64 encoded image
    quality: int = 75
    format: Literal["glb", "gltf", "obj", "stl"] = "glb"

class GenerationResponse(BaseModel):
    id: str
    url: str
    status: str
    created_at: str
    format: str
    size: int

class ErrorResponse(BaseModel):
    error: str
    detail: str