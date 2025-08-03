import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    # Пути
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    MODELS_DIR = os.path.join(BASE_DIR, "models")
    UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")
    
    # API
    API_PREFIX = "/api"
    API_VERSION = "v1"
    
    # Безопасность
    ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://localhost:4173").split(",")
    
    # Модель
    MODEL_PATH = os.getenv("MODEL_PATH", "models/3d_generator.pth")
    
    # Ограничения
    MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB
    ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg"]

settings = Settings()