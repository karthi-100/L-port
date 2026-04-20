"""
Razorpay payment service handling all payment operations.
"""

import razorpay
import hmac
import hashlib
from typing import Dict, Any, Optional
from config import settings
from utils import setup_logger

logger = setup_logger(__name__)


class RazorpayService:
    """Service for handling Razorpay payment operations."""

    def __init__(self):
        """Initialize Razorpay client."""
        if not settings.RAZORPAY_KEY_ID or not settings.RAZORPAY_KEY_SECRET:
            logger.warning("Razorpay credentials not configured")
        
        self.client = razorpay.Client(
            auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
        )

    def create_order(
        self,
        amount: float,
        currency: str = "INR",
        customer_email: str = None,
        customer_name: str = None,
        customer_phone: str = None,
        order_id: str = None,
        description: str = None,
        notes: Dict[str, Any] = None
    ) -> Dict[str, Any]:
        """
        Create a new Razorpay order.
        
        Args:
            amount: Amount in paisa (e.g., 50000 for ₹500)
            currency: Currency code (default: INR)
            customer_email: Customer email for receipt
            customer_name: Customer name
            customer_phone: Customer phone number
            order_id: Custom order ID
            description: Order description
            notes: Additional notes/metadata
            
        Returns:
            Order details from Razorpay
            
        Raises:
            Exception: If order creation fails
        """
        try:
            order_data = {
                "amount": int(amount),
                "currency": currency,
                "receipt": order_id or "",
                "notes": notes or {}
            }
            
            # Add receipt details
            if customer_email:
                order_data["notes"]["customer_email"] = customer_email
            if customer_name:
                order_data["notes"]["customer_name"] = customer_name
            if customer_phone:
                order_data["notes"]["customer_phone"] = customer_phone
            if description:
                order_data["notes"]["description"] = description
            
            order = self.client.order.create(data=order_data)
            logger.info(f"Order created: {order['id']}")
            return order
            
        except Exception as e:
            logger.error(f"Failed to create order: {str(e)}")
            raise

    def verify_payment(
        self,
        razorpay_order_id: str,
        razorpay_payment_id: str,
        razorpay_signature: str
    ) -> bool:
        """
        Verify payment signature from Razorpay webhook.
        
        Args:
            razorpay_order_id: Razorpay order ID
            razorpay_payment_id: Razorpay payment ID
            razorpay_signature: Razorpay signature for verification
            
        Returns:
            True if signature is valid, False otherwise
        """
        try:
            # Create the expected signature
            message = f"{razorpay_order_id}|{razorpay_payment_id}"
            expected_signature = hmac.new(
                settings.RAZORPAY_KEY_SECRET.encode(),
                message.encode(),
                hashlib.sha256
            ).hexdigest()
            
            # Compare signatures
            is_valid = expected_signature == razorpay_signature
            
            if is_valid:
                logger.info(f"Payment verified: {razorpay_payment_id}")
            else:
                logger.warning(f"Payment verification failed: {razorpay_payment_id}")
            
            return is_valid
            
        except Exception as e:
            logger.error(f"Payment verification error: {str(e)}")
            return False

    def fetch_payment(self, payment_id: str) -> Dict[str, Any]:
        """
        Fetch payment details from Razorpay.
        
        Args:
            payment_id: Razorpay payment ID
            
        Returns:
            Payment details
            
        Raises:
            Exception: If payment fetch fails
        """
        try:
            payment = self.client.payment.fetch(payment_id)
            logger.info(f"Payment fetched: {payment_id}")
            return payment
            
        except Exception as e:
            logger.error(f"Failed to fetch payment {payment_id}: {str(e)}")
            raise

    def refund_payment(
        self,
        payment_id: str,
        amount: Optional[float] = None,
        reason: str = None,
        notes: Dict[str, Any] = None
    ) -> Dict[str, Any]:
        """
        Create a refund for a payment.
        
        Args:
            payment_id: Razorpay payment ID to refund
            amount: Refund amount in paisa (optional for full refund)
            reason: Reason for refund
            notes: Additional notes
            
        Returns:
            Refund details from Razorpay
            
        Raises:
            Exception: If refund creation fails
        """
        try:
            refund_data = {
                "notes": notes or {}
            }
            
            if amount:
                refund_data["amount"] = int(amount)
            if reason:
                refund_data["notes"]["reason"] = reason
            
            refund = self.client.payment.refund(payment_id, refund_data)
            logger.info(f"Refund created: {refund['id']} for payment {payment_id}")
            return refund
            
        except Exception as e:
            logger.error(f"Failed to refund payment {payment_id}: {str(e)}")
            raise

    def get_payment_status(self, payment_id: str) -> Dict[str, Any]:
        """
        Get payment status.
        
        Args:
            payment_id: Razorpay payment ID
            
        Returns:
            Payment status and details
        """
        try:
            payment = self.fetch_payment(payment_id)
            status_map = {
                "captured": "completed",
                "authorized": "pending",
                "failed": "failed",
                "refunded": "refunded"
            }
            
            return {
                "payment_id": payment_id,
                "status": status_map.get(payment.get("status", "unknown"), "unknown"),
                "amount": payment.get("amount", 0) / 100,  # Convert from paisa
                "currency": payment.get("currency", "INR"),
                "created_at": payment.get("created_at"),
                "description": payment.get("description"),
                "raw_data": payment
            }
            
        except Exception as e:
            logger.error(f"Failed to get payment status: {str(e)}")
            raise


# Create a singleton instance
razorpay_service = RazorpayService()
