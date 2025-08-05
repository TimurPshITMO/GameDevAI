import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    # Тип запуска
    RUN_MODE = os.getenv("RUN_MODE", "dev")
    HOME_URL = os.getenv("HOME_URL", "0.0.0.0:8000")


    # Пути
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    MODELS_DIR = os.path.join(BASE_DIR, "models")
    UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")
    
    # API
    API_PREFIX = "/api"
    API_VERSION = "v1"
    
    # Безопасность
    ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "*").split(",")
    
    # Ограничения
    MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB
    ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg"]

    MIN_POLYGON_AMOUNT = 500
    MAX_POLYGON_AMOUNT = 5000

settings = Settings()