import os
import re
import uuid
import base64
from datetime import datetime

from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from .config import settings
from .models import GenerationRequest, GenerationResponse, ErrorResponse
from .generator import generator

# Создаем директории, если их нет
os.makedirs(settings.MODELS_DIR, exist_ok=True)
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)

app = FastAPI(
    title="3D Model Generator API",
    description="API для генерации 3D моделей из текстовых промптов и изображений",
    version="1.0.0"
)

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "status": "ok",
        "message": "3D Model Generator API is running",
        "version": settings.API_VERSION
    }

@app.post("/api/generate", response_model=GenerationResponse)
async def generate_model(request:GenerationRequest):
    """
    Generate mesh based on text or image prompt
    """
    model_id = uuid.uuid4()

    try:
        if not (500 <= request.quality <= 5000):
            raise HTTPException(
                status_code=400,
                detail="Quality must be between 500 and 5000"
            )
        
        # Обработка изображения, если оно предоставлено
        reference_image_data = None
        print(request.reference_image)
        if request.promptType == "image":
            reference_image_data = request.reference_image

            if not reference_image_data.startswith('data:'):
                raise HTTPException(
                    status_code=400,
                    detail="Unsupported coding"
                )
            match = re.match(r'data:(?P<mime>[a-zA-Z0-9]+/[a-zA-Z0-9]+);base64,(?P<data>.+)', reference_image_data)
            if not match:
                raise HTTPException(
                    status_code=400,
                    detail="Wrong base64"
                )

            mime_type = match.group('mime')
            base64_data = match.group('data')
                
            if mime_type not in settings.ALLOWED_IMAGE_TYPES:
                raise HTTPException(
                    status_code=400,
                    detail=f"Unsupported file type. Allowed types: {', '.join(settings.ALLOWED_IMAGE_TYPES)}"
                )

            file_path = os.path.join(settings.UPLOAD_DIR, f"{model_id}.{mime_type.split('/')[1]}")

            try:
                image_data = base64.b64decode(base64_data)
                with open(file_path, 'wb') as f:
                    f.write(image_data)
            except Exception as e:
                raise RuntimeError(f"Error decoding base64: {str(e)}")
        
        else:
            file_path = os.path.join(settings.UPLOAD_DIR, f"{model_id}.txt")
            with open(file_path, "w") as buffer:
                buffer.write(request.prompt)

        # Генерация модели
        result = generator.generate_from_prompt(
            model_id = model_id,
            prompt = reference_image_data if request.promptType == "image" else request.prompt,
            prompt_type = request.promptType,
            quality = request.quality,
        )
        
        # Формируем URL (в реальном проекте здесь будет полный URL)
        model_url = f"{settings.HOME_URL}/models/{result['model_id']}.{result['format']}"
        
        return GenerationResponse(
            id=str(model_id),
            url=model_url,
            status="completed",
            created_at=datetime.now().isoformat(),
            format=result["format"],
            size=result["size"]
        )
    
    except HTTPException as he:
        raise he
    except Exception as e:
        print(f"Error generating model: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while generating the model"
        )

# Маршрут для скачивания моделей
@app.get("/models/{model_id}.{format}")
def get_model(model_id: str, format: str):
    file_path = os.path.join(settings.MODELS_DIR, f"{model_id}.{format}")
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Model not found")
    
    # В реальном приложении здесь будет отправка файла
    return {"file": file_path, "size": os.path.getsize(file_path)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8888)