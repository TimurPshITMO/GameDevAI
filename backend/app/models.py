from pydantic import BaseModel
from typing import Optional, List, Literal
from fastapi import UploadFile

class GenerationRequest(BaseModel):
    prompt: Optional[str] = None
    promptType: Optional[str] = 'text'
    reference_image: Optional[str] = ''
    quality: int

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