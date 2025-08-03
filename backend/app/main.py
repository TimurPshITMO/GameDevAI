import os
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
    Генерация 3D-модели на основе текстового промпта и опционального изображения
    """
    try:
        # Проверка качества
        if not (1 <= request.quality <= 100):
            raise HTTPException(
                status_code=400,
                detail="Quality must be between 1 and 100"
            )
        
        # Обработка изображения, если оно предоставлено
        reference_image_data = None
        if request.reference_image:
            # Проверка типа файла
            if request.reference_image.content_type not in settings.ALLOWED_IMAGE_TYPES:
                raise HTTPException(
                    status_code=400,
                    detail=f"Unsupported file type. Allowed types: {', '.join(settings.ALLOWED_IMAGE_TYPES)}"
                )
            
            # Проверка размера файла
            content = await request.reference_image.read()
            if len(content) > settings.MAX_FILE_SIZE:
                raise HTTPException(
                    status_code=400,
                    detail=f"File size exceeds {settings.MAX_FILE_SIZE/(1024*1024)}MB limit"
                )
            
            # Сохраняем временное изображение
            file_path = os.path.join(settings.UPLOAD_DIR, f"{uuid.uuid4()}.{request.reference_image.filename.split('.')[-1]}")
            with open(file_path, "wb") as buffer:
                buffer.write(content)
            
            # Конвертируем в base64 для обработки
            with open(file_path, "rb") as img_file:
                reference_image_data = f"{request.reference_image.content_type};base64,{base64.b64encode(img_file.read()).decode('utf-8')}"
            
            # Удаляем временный файл
            os.remove(file_path)
        
        # Генерация модели
        if reference_image_data:
            result = generator.generate_from_image(
                reference_image_data, 
                prompt=request.prompt, 
                style=request.style
            )
        else:
            result = generator.generate_from_prompt(
                request.prompt, 
                style=request.style, 
                quality=request.quality
            )
        
        # Формируем URL (в реальном проекте здесь будет полный URL)
        model_url = f"/models/{result['model_id']}.{result['format']}"
        
        return GenerationResponse(
            id=result["model_id"],
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
    uvicorn.run(app, host="0.0.0.0", port=8000)