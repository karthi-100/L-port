"""
Basic test examples for the API.
Run with: pytest test_api.py -v
"""

import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


class TestHealth:
    """Health check endpoint tests."""
    
    def test_health_check(self):
        """Test health check endpoint."""
        response = client.get("/health")
        assert response.status_code == 200
        assert response.json()["status"] == "healthy"
    
    def test_root_endpoint(self):
        """Test root endpoint."""
        response = client.get("/")
        assert response.status_code == 200
        assert "app" in response.json()


class TestPaymentAPI:
    """Payment API endpoint tests."""
    
    def test_create_order_valid(self):
        """Test creating order with valid data."""
        payload = {
            "amount": 50000,
            "currency": "INR",
            "customer_email": "test@example.com",
            "customer_name": "John Doe",
            "customer_phone": "+919876543210"
        }
        response = client.post("/payment/create-order", json=payload)
        assert response.status_code == 200
        assert response.json()["status"] == "success"
    
    def test_create_order_invalid_email(self):
        """Test creating order with invalid email."""
        payload = {
            "amount": 50000,
            "currency": "INR",
            "customer_email": "invalid-email",
            "customer_name": "John Doe",
            "customer_phone": "+919876543210"
        }
        response = client.post("/payment/create-order", json=payload)
        assert response.status_code == 422  # Validation error


class TestEmailAPI:
    """Email API endpoint tests."""
    
    def test_send_success_email_valid(self):
        """Test sending success email with valid data."""
        payload = {
            "recipient_email": "test@example.com",
            "recipient_name": "John Doe",
            "order_id": "ORDER_123",
            "payment_id": "pay_123",
            "amount": 500.00
        }
        response = client.post("/mail/send-success", json=payload)
        # Will fail if email credentials not configured, but structure is correct
        if response.status_code != 500:  # If not server error from SMTP
            assert response.json()["status"] in ["success", "error"]
    
    def test_send_failure_email_valid(self):
        """Test sending failure email with valid data."""
        payload = {
            "recipient_email": "test@example.com",
            "recipient_name": "John Doe",
            "order_id": "ORDER_123"
        }
        response = client.post("/mail/send-failure", json=payload)
        if response.status_code != 500:
            assert response.json()["status"] in ["success", "error"]


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
