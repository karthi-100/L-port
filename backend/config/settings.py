"""
Configuration settings for the FastAPI application.
Uses environment variables with predefined defaults.
"""

import os
from typing import Optional
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


class Settings:
    """Application settings."""

    # Application
    APP_NAME: str = "Payment API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = os.getenv("DEBUG", "False").lower() == "true"
    
    # Server
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", 8000))
    
    # Razorpay Configuration
    RAZORPAY_KEY_ID: str = os.getenv("RAZORPAY_KEY_ID", "")
    RAZORPAY_KEY_SECRET: str = os.getenv("RAZORPAY_KEY_SECRET", "")
    RAZORPAY_WEBHOOK_SECRET: str = os.getenv("RAZORPAY_WEBHOOK_SECRET", "")
    
    # Frontend URL for CORS
    FRONTEND_URLS: list = [url.strip() for url in os.getenv("FRONTEND_URL", "http://localhost:5173").split(",") if url.strip()]
    BACKEND_URL: str = os.getenv("BACKEND_URL", "http://localhost:8000")
    
    # Logging
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")
    
    # Database (optional for future)
    DATABASE_URL: Optional[str] = os.getenv("DATABASE_URL", None)
    
    def __init__(self):
        """Validate critical settings on initialization."""
        self.validate_settings()
    
    def validate_settings(self) -> None:
        """Validate that all required settings are present."""
        required_for_production = [
            ("RAZORPAY_KEY_ID", self.RAZORPAY_KEY_ID),
            ("RAZORPAY_KEY_SECRET", self.RAZORPAY_KEY_SECRET),
        ]
        
        if not self.DEBUG:
            missing = [name for name, value in required_for_production if not value]
            if missing:
                raise ValueError(
                    f"Missing required environment variables: {', '.join(missing)}"
                )


# Create settings instance
settings = Settings()
