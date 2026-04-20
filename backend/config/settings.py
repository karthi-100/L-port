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
    APP_NAME: str = "Payment & Email API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = os.getenv("DEBUG", "False").lower() == "true"
    
    # Server
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", 8000))
    
    # Razorpay Configuration
    RAZORPAY_KEY_ID: str = os.getenv("RAZORPAY_KEY_ID", "")
    RAZORPAY_KEY_SECRET: str = os.getenv("RAZORPAY_KEY_SECRET", "")
    RAZORPAY_WEBHOOK_SECRET: str = os.getenv("RAZORPAY_WEBHOOK_SECRET", "")
    
    # SMTP Configuration (Gmail)
    SMTP_EMAIL: str = os.getenv("SMTP_EMAIL", "")
    SMTP_PASSWORD: str = os.getenv("SMTP_PASSWORD", "")  # Gmail App Password
    SMTP_SERVER: str = os.getenv("SMTP_SERVER", "smtp.gmail.com")
    SMTP_PORT: int = int(os.getenv("SMTP_PORT", "587"))
    SENDER_NAME: str = os.getenv("SENDER_NAME", "L-Port Support")
    
    # Frontend URL for CORS
    FRONTEND_URL: str = os.getenv("FRONTEND_URL", "http://localhost:5173")
    BACKEND_URL: str = os.getenv("BACKEND_URL", "http://localhost:8000")
    
    # Email Configuration
    SUPPORT_EMAIL: str = os.getenv("SUPPORT_EMAIL", "support@l-port.com")
    
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
            ("SMTP_EMAIL", self.SMTP_EMAIL),
            ("SMTP_PASSWORD", self.SMTP_PASSWORD),
        ]
        
        if not self.DEBUG:
            missing = [name for name, value in required_for_production if not value]
            if missing:
                raise ValueError(
                    f"Missing required environment variables: {', '.join(missing)}"
                )


# Create settings instance
settings = Settings()
