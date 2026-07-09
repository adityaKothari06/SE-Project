from dotenv import load_dotenv
import os

# Load environment variables from .env
load_dotenv()


class Settings:
    DB_USER = os.getenv("DB_USER")
    DB_PASSWORD = os.getenv("DB_PASSWORD")
    DB_HOST = os.getenv("DB_HOST")
    DB_NAME = os.getenv("DB_NAME")

    # Future variables
    API_TITLE = "Zero Waste Pantry API"
    API_VERSION = "1.0.0"

    ALLOWED_ORIGINS = os.getenv(
        "ALLOWED_ORIGINS",
        "http://localhost:5173"
    ).split(",")


settings = Settings()