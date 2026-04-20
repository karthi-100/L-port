"""
Payment API routes for Razorpay integration.
"""

from fastapi import APIRouter, HTTPException, status
from typing import Dict, Any
from schemas import (
    CreateOrderRequest,
    CreateOrderResponse,
    VerifyPaymentRequest,
    VerifyPaymentResponse,
    RefundRequest,
    RefundResponse,
    PaymentStatusRequest,
    PaymentStatusResponse,
    ErrorResponse
)
from services import razorpay_service
from utils import setup_logger

logger = setup_logger(__name__)

router = APIRouter(prefix="/payment", tags=["Payment"])


@router.post(
    "/create-order",
    response_model=CreateOrderResponse,
    responses={
        400: {"model": ErrorResponse},
        500: {"model": ErrorResponse}
    }
)
async def create_order(request: CreateOrderRequest) -> Dict[str, Any]:
    """
    Create a new Razorpay order.
    
    **Request body:**
    - `amount`: Amount in paisa (e.g., 50000 for ₹500)
    - `currency`: Currency code (default: INR)
    - `customer_email`: Customer email
    - `customer_name`: Customer name
    - `customer_phone`: Customer phone number
    - `order_id`: Custom order ID (optional)
    - `description`: Order description (optional)
    - `notes`: Additional notes (optional)
    
    **Response:**
    - Returns order details with Razorpay order ID
    
    **Raises:**
    - 400: Invalid request parameters
    - 500: Server error during order creation
    """
    try:
        order = razorpay_service.create_order(
            amount=request.amount,
            currency=request.currency,
            customer_email=request.customer_email,
            customer_name=request.customer_name,
            customer_phone=request.customer_phone,
            order_id=request.order_id,
            description=request.description,
            notes=request.notes
        )
        
        return {
            "status": "success",
            "order_id": order["id"],
            "amount": request.amount,
            "currency": request.currency,
            "message": "Order created successfully"
        }
        
    except ValueError as e:
        logger.error(f"Validation error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Validation error: {str(e)}"
        )
    except Exception as e:
        logger.error(f"Order creation failed: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create order: {str(e)}"
        )


@router.post(
    "/verify",
    response_model=VerifyPaymentResponse,
    responses={
        400: {"model": ErrorResponse},
        401: {"model": ErrorResponse},
        500: {"model": ErrorResponse}
    }
)
async def verify_payment(request: VerifyPaymentRequest) -> Dict[str, Any]:
    """
    Verify payment signature from Razorpay.
    
    **Request body:**
    - `razorpay_order_id`: Razorpay order ID
    - `razorpay_payment_id`: Razorpay payment ID
    - `razorpay_signature`: Razorpay signature
    
    **Response:**
    - Returns verification status and payment details
    
    **Raises:**
    - 401: Payment verification failed
    - 400: Invalid request parameters
    - 500: Server error during verification
    """
    try:
        is_valid = razorpay_service.verify_payment(
            razorpay_order_id=request.razorpay_order_id,
            razorpay_payment_id=request.razorpay_payment_id,
            razorpay_signature=request.razorpay_signature
        )
        
        if not is_valid:
            logger.warning(f"Payment verification failed for {request.razorpay_payment_id}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Payment verification failed - Invalid signature"
            )
        
        # Fetch payment details
        payment = razorpay_service.fetch_payment(request.razorpay_payment_id)
        
        return {
            "status": "success",
            "message": "Payment verified successfully",
            "payment_id": request.razorpay_payment_id,
            "order_id": request.razorpay_order_id,
            "amount": payment.get("amount", 0) / 100
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Payment verification error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Payment verification failed: {str(e)}"
        )


@router.post(
    "/refund",
    response_model=RefundResponse,
    responses={
        400: {"model": ErrorResponse},
        404: {"model": ErrorResponse},
        500: {"model": ErrorResponse}
    }
)
async def refund_payment(request: RefundRequest) -> Dict[str, Any]:
    """
    Create a refund for a payment.
    
    **Request body:**
    - `payment_id`: Razorpay payment ID
    - `amount`: Refund amount in paisa (optional for full refund)
    - `reason`: Reason for refund (optional)
    - `notes`: Additional notes (optional)
    
    **Response:**
    - Returns refund details with refund ID
    
    **Raises:**
    - 400: Invalid request parameters
    - 404: Payment not found
    - 500: Server error during refund creation
    """
    try:
        refund = razorpay_service.refund_payment(
            payment_id=request.payment_id,
            amount=request.amount,
            reason=request.reason,
            notes=request.notes
        )
        
        return {
            "status": "success",
            "message": "Refund processed successfully",
            "refund_id": refund["id"],
            "amount": refund.get("amount", 0) / 100 if refund.get("amount") else None
        }
        
    except Exception as e:
        error_msg = str(e)
        if "not found" in error_msg.lower():
            status_code = status.HTTP_404_NOT_FOUND
        else:
            status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        
        logger.error(f"Refund failed: {error_msg}")
        raise HTTPException(
            status_code=status_code,
            detail=f"Refund failed: {error_msg}"
        )


@router.get(
    "/status/{payment_id}",
    response_model=PaymentStatusResponse,
    responses={
        404: {"model": ErrorResponse},
        500: {"model": ErrorResponse}
    }
)
async def get_payment_status(payment_id: str) -> Dict[str, Any]:
    """
    Get payment status.
    
    **Path parameters:**
    - `payment_id`: Razorpay payment ID
    
    **Response:**
    - Returns payment status and details
    
    **Raises:**
    - 404: Payment not found
    - 500: Server error
    """
    try:
        status_data = razorpay_service.get_payment_status(payment_id)
        
        return {
            "status": status_data["status"],
            "payment_id": payment_id,
            "amount": status_data["amount"],
            "currency": status_data["currency"],
            "created_at": status_data.get("created_at"),
            "description": status_data.get("description")
        }
        
    except Exception as e:
        error_msg = str(e)
        if "not found" in error_msg.lower():
            status_code = status.HTTP_404_NOT_FOUND
        else:
            status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        
        logger.error(f"Failed to get payment status: {error_msg}")
        raise HTTPException(
            status_code=status_code,
            detail=f"Failed to get payment status: {error_msg}"
        )
