"""Routes module."""

from .payment import router as payment_router
from .mail import router as mail_router

__all__ = ["payment_router", "mail_router"]
