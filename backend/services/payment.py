"""
Razorpay payment service handling all payment operations (SDK-free).
"""

import requests
import hmac
import hashlib
from typing import Dict, Any, Optional
from requests.auth import HTTPBasicAuth

from config import settings
from utils import setup_logger

logger = setup_logger(__name__)


class RazorpayService:
    """Service for handling Razorpay payment operations using REST API."""

    def __init__(self):
        """Initialize Razorpay API client."""
        if not settings.RAZORPAY_KEY_ID or not settings.RAZORPAY_KEY_SECRET:
            logger.warning("Razorpay credentials not configured")

        self.base_url = "https://api.razorpay.com/v1"
        self.auth = HTTPBasicAuth(
            settings.RAZORPAY_KEY_ID,
            settings.RAZORPAY_KEY_SECRET
        )

    # -----------------------------
    # CREATE ORDER
    # -----------------------------
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
        Amount should be in paisa (e.g., 50000 for ₹500).
        """
        try:
            payload = {
                "amount": int(amount),
                "currency": currency,
                "receipt": order_id or "",
                "notes": notes or {}
            }

            # Add optional details
            if customer_email:
                payload["notes"]["customer_email"] = customer_email
            if customer_name:
                payload["notes"]["customer_name"] = customer_name
            if customer_phone:
                payload["notes"]["customer_phone"] = customer_phone
            if description:
                payload["notes"]["description"] = description

            response = requests.post(
                f"{self.base_url}/orders",
                auth=self.auth,
                json=payload,
                timeout=10
            )

            response.raise_for_status()
            order = response.json()

            logger.info(f"Order created: {order['id']}")
            return order

        except requests.RequestException as e:
            logger.error(f"HTTP error while creating order: {str(e)}")
            raise
        except Exception as e:
            logger.error(f"Failed to create order: {str(e)}")
            raise

    # -----------------------------
    # VERIFY PAYMENT SIGNATURE
    # -----------------------------
    def verify_payment(
        self,
        razorpay_order_id: str,
        razorpay_payment_id: str,
        razorpay_signature: str
    ) -> bool:
        """
        Verify payment signature.
        """
        try:
            message = f"{razorpay_order_id}|{razorpay_payment_id}"

            expected_signature = hmac.new(
                settings.RAZORPAY_KEY_SECRET.encode(),
                message.encode(),
                hashlib.sha256
            ).hexdigest()

            is_valid = hmac.compare_digest(
                expected_signature,
                razorpay_signature
            )

            if is_valid:
                logger.info(f"Payment verified: {razorpay_payment_id}")
            else:
                logger.warning(f"Payment verification failed: {razorpay_payment_id}")

            return is_valid

        except Exception as e:
            logger.error(f"Payment verification error: {str(e)}")
            return False

    # -----------------------------
    # FETCH PAYMENT
    # -----------------------------
    def fetch_payment(self, payment_id: str) -> Dict[str, Any]:
        """
        Fetch payment details from Razorpay.
        """
        try:
            response = requests.get(
                f"{self.base_url}/payments/{payment_id}",
                auth=self.auth,
                timeout=10
            )

            response.raise_for_status()
            payment = response.json()

            logger.info(f"Payment fetched: {payment_id}")
            return payment

        except requests.RequestException as e:
            logger.error(f"HTTP error while fetching payment: {str(e)}")
            raise
        except Exception as e:
            logger.error(f"Failed to fetch payment {payment_id}: {str(e)}")
            raise

    # -----------------------------
    # REFUND PAYMENT
    # -----------------------------
    def refund_payment(
        self,
        payment_id: str,
        amount: Optional[float] = None,
        reason: str = None,
        notes: Dict[str, Any] = None
    ) -> Dict[str, Any]:
        """
        Create a refund for a payment.
        """
        try:
            payload = {
                "notes": notes or {}
            }

            if amount:
                payload["amount"] = int(amount)
            if reason:
                payload["notes"]["reason"] = reason

            response = requests.post(
                f"{self.base_url}/payments/{payment_id}/refund",
                auth=self.auth,
                json=payload,
                timeout=10
            )

            response.raise_for_status()
            refund = response.json()

            logger.info(f"Refund created: {refund['id']} for payment {payment_id}")
            return refund

        except requests.RequestException as e:
            logger.error(f"HTTP error while refunding: {str(e)}")
            raise
        except Exception as e:
            logger.error(f"Failed to refund payment {payment_id}: {str(e)}")
            raise

    # -----------------------------
    # PAYMENT STATUS
    # -----------------------------
    def get_payment_status(self, payment_id: str) -> Dict[str, Any]:
        """
        Get normalized payment status.
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
                "amount": payment.get("amount", 0) / 100,
                "currency": payment.get("currency", "INR"),
                "created_at": payment.get("created_at"),
                "description": payment.get("description"),
                "raw_data": payment
            }

        except Exception as e:
            logger.error(f"Failed to get payment status: {str(e)}")
            raise


# Singleton instance
razorpay_service = RazorpayService()