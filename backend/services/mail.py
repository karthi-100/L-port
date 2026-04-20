"""
Email service for sending emails via Gmail SMTP.
"""

import smtplib
import uuid
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Optional, List
from config import settings
from utils import setup_logger, get_success_email_template, get_failure_email_template, get_invoice_email_template

logger = setup_logger(__name__)


class EmailService:
    """Service for sending emails via SMTP."""

    def __init__(self):
        """Initialize email service with SMTP settings."""
        self.smtp_server = settings.SMTP_SERVER
        self.smtp_port = settings.SMTP_PORT
        self.sender_email = settings.SMTP_EMAIL
        self.sender_password = settings.SMTP_PASSWORD
        self.sender_name = settings.SENDER_NAME

    def _send_email(
        self,
        recipient_email: str,
        subject: str,
        html_content: str,
        recipient_name: Optional[str] = None
    ) -> str:
        """
        Send email via SMTP.
        
        Args:
            recipient_email: Recipient's email address
            subject: Email subject
            html_content: HTML content of the email
            recipient_name: Recipient's name (optional)
            
        Returns:
            Email ID (UUID)
            
        Raises:
            Exception: If email sending fails
        """
        email_id = str(uuid.uuid4())
        
        try:
            # Create message
            message = MIMEMultipart("alternative")
            message["From"] = f"{self.sender_name} <{self.sender_email}>"
            message["To"] = recipient_email
            message["Subject"] = subject
            message["X-Mailer"] = f"L-Port/1.0"
            message["Message-ID"] = email_id
            
            # Attach HTML content
            html_part = MIMEText(html_content, "html")
            message.attach(html_part)
            
            # Send email
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls()
                server.login(self.sender_email, self.sender_password)
                server.send_message(message)
            
            logger.info(f"Email sent successfully - ID: {email_id}, To: {recipient_email}")
            return email_id
            
        except smtplib.SMTPAuthenticationError:
            logger.error("SMTP authentication failed. Check email and password.")
            raise Exception("Email authentication failed. Please check SMTP credentials.")
        except smtplib.SMTPException as e:
            logger.error(f"SMTP error: {str(e)}")
            raise Exception(f"Failed to send email: {str(e)}")
        except Exception as e:
            logger.error(f"Email sending failed: {str(e)}")
            raise

    def send_success_email(
        self,
        recipient_email: str,
        recipient_name: str,
        order_id: str,
        payment_id: str,
        amount: float,
        currency: str = "INR",
        transaction_date: Optional[str] = None
    ) -> str:
        """
        Send payment success email.
        
        Args:
            recipient_email: Recipient's email address
            recipient_name: Recipient's name
            order_id: Order ID
            payment_id: Payment ID
            amount: Amount paid
            currency: Currency code
            transaction_date: Transaction date (optional)
            
        Returns:
            Email ID
        """
        try:
            html_content = get_success_email_template(
                recipient_name=recipient_name,
                order_id=order_id,
                payment_id=payment_id,
                amount=amount,
                currency=currency
            )
            
            subject = f"Payment Successful - Order #{order_id}"
            
            email_id = self._send_email(
                recipient_email=recipient_email,
                subject=subject,
                html_content=html_content,
                recipient_name=recipient_name
            )
            
            logger.info(f"Success email sent to {recipient_email} for order {order_id}")
            return email_id
            
        except Exception as e:
            logger.error(f"Failed to send success email: {str(e)}")
            raise

    def send_failure_email(
        self,
        recipient_email: str,
        recipient_name: str,
        order_id: str,
        reason: Optional[str] = None,
        amount: Optional[float] = None
    ) -> str:
        """
        Send payment failure email.
        
        Args:
            recipient_email: Recipient's email address
            recipient_name: Recipient's name
            order_id: Order ID
            reason: Failure reason
            amount: Amount that failed to process
            
        Returns:
            Email ID
        """
        try:
            reason = reason or "Payment processing failed. Please try again or contact support."
            
            html_content = get_failure_email_template(
                recipient_name=recipient_name,
                order_id=order_id,
                reason=reason
            )
            
            subject = f"Payment Failed - Order #{order_id}"
            
            email_id = self._send_email(
                recipient_email=recipient_email,
                subject=subject,
                html_content=html_content,
                recipient_name=recipient_name
            )
            
            logger.info(f"Failure email sent to {recipient_email} for order {order_id}")
            return email_id
            
        except Exception as e:
            logger.error(f"Failed to send failure email: {str(e)}")
            raise

    def send_invoice_email(
        self,
        recipient_email: str,
        recipient_name: str,
        invoice_id: str,
        order_id: str,
        amount: float,
        currency: str = "INR",
        items: Optional[List[dict]] = None,
        transaction_date: Optional[str] = None,
        payment_method: Optional[str] = None
    ) -> str:
        """
        Send invoice email.
        
        Args:
            recipient_email: Recipient's email address
            recipient_name: Recipient's name
            invoice_id: Invoice ID
            order_id: Order ID
            amount: Total amount
            currency: Currency code
            items: List of items (each with name, quantity, price)
            transaction_date: Transaction date
            payment_method: Payment method used
            
        Returns:
            Email ID
        """
        try:
            html_content = get_invoice_email_template(
                recipient_name=recipient_name,
                invoice_id=invoice_id,
                order_id=order_id,
                amount=amount,
                currency=currency,
                items=items,
                transaction_date=transaction_date,
                payment_method=payment_method
            )
            
            subject = f"Invoice #{invoice_id} - Order #{order_id}"
            
            email_id = self._send_email(
                recipient_email=recipient_email,
                subject=subject,
                html_content=html_content,
                recipient_name=recipient_name
            )
            
            logger.info(f"Invoice email sent to {recipient_email} - Invoice: {invoice_id}")
            return email_id
            
        except Exception as e:
            logger.error(f"Failed to send invoice email: {str(e)}")
            raise


# Create a singleton instance
email_service = EmailService()
