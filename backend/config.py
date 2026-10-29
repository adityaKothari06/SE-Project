from dotenv import load_dotenv
import os

# Load environment variables from .env
load_dotenv()


class Settings:
    DB_USER = os.getenv("DB_USER")
    DB_PASSWORD = os.getenv("DB_PASSWORD")
    DB_HOST = os.getenv("DB_HOST")
    DB_NAME = os.getenv("DB_NAME")
    DB_PORT = os.getenv("DB_PORT", 4000)

    API_TITLE = "Zero Waste Pantry API"
    API_VERSION = "1.0.0"

    raw_origins = os.getenv(
        "ALLOWED_ORIGINS",
        "http://localhost:5173,https://se-project-adityakothari.vercel.app"
    )
    # Strip spaces and trailing slashes from every origin
    ALLOWED_ORIGINS = [
        origin.strip().rstrip("/") 
        for origin in raw_origins.split(",") 
        if origin.strip()
    ]


settings = Settings()