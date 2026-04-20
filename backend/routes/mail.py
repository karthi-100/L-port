"""
Email API routes for sending various types of emails.
"""

from fastapi import APIRouter, HTTPException, status
from typing import Dict, Any
from schemas import (
    SendSuccessEmailRequest,
    SendFailureEmailRequest,
    SendInvoiceEmailRequest,
    EmailResponse,
    ErrorResponse
)
from services import email_service
from utils import setup_logger

logger = setup_logger(__name__)

router = APIRouter(prefix="/mail", tags=["Email"])


@router.post(
    "/send-success",
    response_model=EmailResponse,
    responses={
        400: {"model": ErrorResponse},
        500: {"model": ErrorResponse}
    }
)
async def send_success_email(request: SendSuccessEmailRequest) -> Dict[str, Any]:
    """
    Send payment success email.
    
    **Request body:**
    - `recipient_email`: Recipient's email address
    - `recipient_name`: Recipient's name
    - `order_id`: Order ID
    - `payment_id`: Payment ID
    - `amount`: Amount paid
    - `currency`: Currency code (default: INR)
    - `transaction_date`: Transaction date (optional)
    
    **Response:**
    - Returns success status and email ID
    
    **Raises:**
    - 400: Invalid request parameters
    - 500: Failed to send email
    """
    try:
        email_id = email_service.send_success_email(
            recipient_email=request.recipient_email,
            recipient_name=request.recipient_name,
            order_id=request.order_id,
            payment_id=request.payment_id,
            amount=request.amount,
            currency=request.currency,
            transaction_date=request.transaction_date
        )
        
        return {
            "status": "success",
            "message": f"Success email sent to {request.recipient_email}",
            "email_id": email_id
        }
        
    except ValueError as e:
        logger.error(f"Validation error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Validation error: {str(e)}"
        )
    except Exception as e:
        logger.error(f"Failed to send success email: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to send email: {str(e)}"
        )


@router.post(
    "/send-failure",
    response_model=EmailResponse,
    responses={
        400: {"model": ErrorResponse},
        500: {"model": ErrorResponse}
    }
)
async def send_failure_email(request: SendFailureEmailRequest) -> Dict[str, Any]:
    """
    Send payment failure notification email.
    
    **Request body:**
    - `recipient_email`: Recipient's email address
    - `recipient_name`: Recipient's name
    - `order_id`: Order ID
    - `reason`: Failure reason (optional)
    - `amount`: Amount that failed to process (optional)
    
    **Response:**
    - Returns success status and email ID
    
    **Raises:**
    - 400: Invalid request parameters
    - 500: Failed to send email
    """
    try:
        email_id = email_service.send_failure_email(
            recipient_email=request.recipient_email,
            recipient_name=request.recipient_name,
            order_id=request.order_id,
            reason=request.reason,
            amount=request.amount
        )
        
        return {
            "status": "success",
            "message": f"Failure notification email sent to {request.recipient_email}",
            "email_id": email_id
        }
        
    except ValueError as e:
        logger.error(f"Validation error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Validation error: {str(e)}"
        )
    except Exception as e:
        logger.error(f"Failed to send failure email: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to send email: {str(e)}"
        )


@router.post(
    "/send-invoice",
    response_model=EmailResponse,
    responses={
        400: {"model": ErrorResponse},
        500: {"model": ErrorResponse}
    }
)
async def send_invoice_email(request: SendInvoiceEmailRequest) -> Dict[str, Any]:
    """
    Send invoice email with itemized details.
    
    **Request body:**
    - `recipient_email`: Recipient's email address
    - `recipient_name`: Recipient's name
    - `invoice_id`: Invoice ID
    - `order_id`: Order ID
    - `amount`: Total amount
    - `currency`: Currency code (default: INR)
    - `items`: List of items with name, quantity, price (optional)
    - `transaction_date`: Transaction date (optional)
    - `payment_method`: Payment method used (optional)
    
    **Response:**
    - Returns success status and email ID
    
    **Raises:**
    - 400: Invalid request parameters
    - 500: Failed to send email
    """
    try:
        email_id = email_service.send_invoice_email(
            recipient_email=request.recipient_email,
            recipient_name=request.recipient_name,
            invoice_id=request.invoice_id,
            order_id=request.order_id,
            amount=request.amount,
            currency=request.currency,
            items=request.items,
            transaction_date=request.transaction_date,
            payment_method=request.payment_method
        )
        
        return {
            "status": "success",
            "message": f"Invoice email sent to {request.recipient_email}",
            "email_id": email_id
        }
        
    except ValueError as e:
        logger.error(f"Validation error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Validation error: {str(e)}"
        )
    except Exception as e:
        logger.error(f"Failed to send invoice email: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to send email: {str(e)}"
        )
