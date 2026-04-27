"""
Pydantic schemas for request and response validation.
"""

from pydantic import BaseModel, Field, EmailStr
from typing import Optional, Dict, Any
from enum import Enum


# ======================== Payment Schemas ========================

class PaymentStatus(str, Enum):
    """Payment status enumeration."""
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"
    REFUNDED = "refunded"


class CreateOrderRequest(BaseModel):
    """Request schema for creating a Razorpay order."""
    amount: float = Field(..., gt=0, description="Amount in paisa (e.g., 50000 for ₹500)")
    currency: str = Field(default="INR", description="Currency code")
    customer_email: EmailStr = Field(..., description="Customer email address")
    customer_name: str = Field(..., min_length=1, description="Customer name")
    customer_phone: str = Field(..., pattern=r"^\+?1?\d{9,15}$", description="Customer phone number")
    order_id: Optional[str] = Field(default=None, description="Your order ID (optional)")
    description: Optional[str] = Field(default=None, description="Order description")
    notes: Optional[Dict[str, Any]] = Field(default=None, description="Additional notes")


class CreateOrderResponse(BaseModel):
    """Response schema for order creation."""
    status: str = "success"
    order_id: str
    amount: float
    currency: str
    message: str


class VerifyPaymentRequest(BaseModel):
    """Request schema for payment verification."""
    razorpay_order_id: str = Field(..., description="Razorpay order ID")
    razorpay_payment_id: str = Field(..., description="Razorpay payment ID")
    razorpay_signature: str = Field(..., description="Razorpay signature")


class VerifyPaymentResponse(BaseModel):
    """Response schema for payment verification."""
    status: str = Field(..., description="success or error")
    message: str
    payment_id: Optional[str] = None
    order_id: Optional[str] = None
    amount: Optional[float] = None


class RefundRequest(BaseModel):
    """Request schema for refund."""
    payment_id: str = Field(..., description="Razorpay payment ID")
    amount: Optional[float] = Field(default=None, description="Refund amount in paisa (optional for full refund)")
    reason: Optional[str] = Field(default=None, description="Reason for refund")
    notes: Optional[Dict[str, Any]] = Field(default=None, description="Additional notes")


class RefundResponse(BaseModel):
    """Response schema for refund."""
    status: str
    message: str
    refund_id: Optional[str] = None
    amount: Optional[float] = None


class PaymentStatusRequest(BaseModel):
    """Request schema for checking payment status."""
    payment_id: str = Field(..., description="Razorpay payment ID")


class PaymentStatusResponse(BaseModel):
    """Response schema for payment status."""
    status: PaymentStatus
    payment_id: str
    amount: float
    currency: str
    created_at: Optional[str] = None
    description: Optional[str] = None




class ErrorResponse(BaseModel):
    """Standard error response schema."""
    status: str = "error"
    message: str
    error_code: Optional[str] = None
    details: Optional[Dict[str, Any]] = None
