import os
import uuid
import io
import logging
from pathlib import Path
from typing import Union, Optional

from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, confloat, conint
from PIL import Image

from ml.model import MeshGenerator

# Initialize logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Constants
OUTPUT_DIR = Path("/tmp/mesh_output")
OUTPUT_DIR.mkdir(exist_ok=True)

# Initialize MeshGenerator
mesh_generator = MeshGenerator()

app = FastAPI(
    title="Mesh Generation API",
    description="API for generating 3D meshes from text or image prompts",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request models
class GenerationRequest(BaseModel):
    simplify: confloat(ge=0.01, le=1.0) = 0.95
    texture_size: conint(ge=256, le=4096) = 1024

class TextRequest(GenerationRequest):
    prompt: str

class ImageRequest(GenerationRequest):
    image: Union[str, bytes]

def validate_image_input(image_data: Union[str, bytes]) -> Image.Image:
    """Validate and convert image input to PIL Image"""
    try:
        if isinstance(image_data, str):  # File path case
            if not os.path.exists(image_data):
                raise ValueError("Image file not found")
            return Image.open(image_data)
        else:  # Bytes case
            return Image.open(io.BytesIO(image_data))
    except Exception as e:
        raise ValueError(f"Invalid image input: {str(e)}")

@app.post("/generate/text", response_class=FileResponse)
async def generate_from_text(request: TextRequest):
    """
    Generate a 3D mesh from a text prompt.
    
    Parameters:
    - prompt: Text description to generate from
    - simplify: Mesh simplification factor (0.01 to 1.0)
    - texture_size: Output texture size (256 to 4096)
    
    Returns:
    - GLB file containing the generated 3D mesh
    """
    try:
        logger.info(f"Generating mesh for text prompt: {request.prompt[:50]}...")
        
        output_path = mesh_generator.generate(
            input_data=request.prompt,
            simplify=request.simplify,
            texture_size=request.texture_size,
            output_dir=OUTPUT_DIR
        )
        
        return FileResponse(
            path=output_path,
            media_type="model/gltf-binary",
            filename=f"mesh_{uuid.uuid4().hex[:8]}.glb"
        )
    except Exception as e:
        logger.error(f"Text generation failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate/image", response_class=FileResponse)
async def generate_from_image(
    image: UploadFile = File(...),
    simplify: float = Form(0.95),
    texture_size: int = Form(1024)
):
    """
    Generate a 3D mesh from an image.
    
    Parameters:
    - image: Uploaded image file
    - simplify: Mesh simplification factor (0.01 to 1.0)
    - texture_size: Output texture size (256 to 4096)
    
    Returns:
    - GLB file containing the generated 3D mesh
    """
    try:
        logger.info(f"Generating mesh from image: {image.filename}")
        
        # Read and validate image
        image_data = await image.read()
        pil_image = validate_image_input(image_data)
        
        output_path = mesh_generator.generate(
            input_data=pil_image,
            simplify=simplify,
            texture_size=texture_size,
            output_dir=OUTPUT_DIR
        )
        
        return FileResponse(
            path=output_path,
            media_type="model/gltf-binary",
            filename=f"mesh_{uuid.uuid4().hex[:8]}.glb"
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Image generation failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Image generation failed")

@app.get("/health")
async def health_check():
    """Service health check"""
    return {
        "status": "healthy",
        "version": app.version,
        "model_ready": True
    }

@app.on_event("shutdown")
def shutdown_event():
    """Cleanup resources on shutdown"""
    logger.info("Shutting down Mesh Generation API")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3000)