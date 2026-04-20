"""
Email HTML templates for various email types.
"""


def get_success_email_template(
    recipient_name: str,
    order_id: str,
    payment_id: str,
    amount: float,
    currency: str = "INR"
) -> str:
    """Generate HTML for payment success email."""
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {{
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f5f5f5;
                margin: 0;
                padding: 20px;
            }}
            .container {{
                max-width: 600px;
                margin: 0 auto;
                background-color: white;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                overflow: hidden;
            }}
            .header {{
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                text-align: center;
            }}
            .header h1 {{
                margin: 0;
                font-size: 28px;
                font-weight: 600;
            }}
            .content {{
                padding: 30px;
            }}
            .success-badge {{
                text-align: center;
                margin: 20px 0;
            }}
            .success-icon {{
                font-size: 60px;
                color: #4caf50;
            }}
            .details {{
                background-color: #f9f9f9;
                border-left: 4px solid #4caf50;
                padding: 15px;
                margin: 20px 0;
                border-radius: 4px;
            }}
            .detail-row {{
                display: flex;
                justify-content: space-between;
                margin: 10px 0;
                font-size: 14px;
            }}
            .label {{
                font-weight: 600;
                color: #333;
            }}
            .value {{
                color: #666;
            }}
            .footer {{
                background-color: #f5f5f5;
                padding: 20px;
                text-align: center;
                font-size: 12px;
                color: #999;
                border-top: 1px solid #ddd;
            }}
            .button {{
                display: inline-block;
                background-color: #667eea;
                color: white;
                padding: 12px 30px;
                text-decoration: none;
                border-radius: 4px;
                margin-top: 20px;
                font-weight: 600;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>✓ Payment Successful</h1>
            </div>
            <div class="content">
                <p>Hi {recipient_name},</p>
                <p>Thank you for your payment! Your transaction has been completed successfully.</p>
                
                <div class="success-badge">
                    <div class="success-icon">✓</div>
                </div>
                
                <div class="details">
                    <div class="detail-row">
                        <span class="label">Order ID:</span>
                        <span class="value">{order_id}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Payment ID:</span>
                        <span class="value">{payment_id}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Amount:</span>
                        <span class="value">{amount:,.2f} {currency}</span>
                    </div>
                </div>
                
                <p>A confirmation has been sent to this email address. Please keep this receipt for your records.</p>
                <p>If you have any questions, please don't hesitate to contact our support team.</p>
            </div>
            <div class="footer">
                <p>© 2024 L-Port. All rights reserved.</p>
                <p>This is an automated email, please do not reply.</p>
            </div>
        </div>
    </body>
    </html>
    """


def get_failure_email_template(
    recipient_name: str,
    order_id: str,
    reason: str = "Payment processing failed"
) -> str:
    """Generate HTML for payment failure email."""
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {{
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f5f5f5;
                margin: 0;
                padding: 20px;
            }}
            .container {{
                max-width: 600px;
                margin: 0 auto;
                background-color: white;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                overflow: hidden;
            }}
            .header {{
                background: linear-gradient(135deg, #f44336 0%, #e91e63 100%);
                color: white;
                padding: 30px;
                text-align: center;
            }}
            .header h1 {{
                margin: 0;
                font-size: 28px;
                font-weight: 600;
            }}
            .content {{
                padding: 30px;
            }}
            .alert {{
                background-color: #ffebee;
                border-left: 4px solid #f44336;
                padding: 15px;
                margin: 20px 0;
                border-radius: 4px;
            }}
            .alert-title {{
                font-weight: 600;
                color: #c62828;
                margin-bottom: 5px;
            }}
            .footer {{
                background-color: #f5f5f5;
                padding: 20px;
                text-align: center;
                font-size: 12px;
                color: #999;
                border-top: 1px solid #ddd;
            }}
            .button {{
                display: inline-block;
                background-color: #667eea;
                color: white;
                padding: 12px 30px;
                text-decoration: none;
                border-radius: 4px;
                margin-top: 20px;
                font-weight: 600;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>✗ Payment Failed</h1>
            </div>
            <div class="content">
                <p>Hi {recipient_name},</p>
                <p>Unfortunately, your payment could not be processed.</p>
                
                <div class="alert">
                    <div class="alert-title">Payment Issue</div>
                    <p>{reason}</p>
                    <p><strong>Order ID:</strong> {order_id}</p>
                </div>
                
                <p><strong>What you can do:</strong></p>
                <ul>
                    <li>Check your payment details and try again</li>
                    <li>Ensure you have sufficient funds</li>
                    <li>Try a different payment method</li>
                    <li>Contact our support team for assistance</li>
                </ul>
                
                <p>If this issue persists, please don't hesitate to reach out to our support team for help.</p>
            </div>
            <div class="footer">
                <p>© 2024 L-Port. All rights reserved.</p>
                <p>This is an automated email, please do not reply.</p>
            </div>
        </div>
    </body>
    </html>
    """


def get_invoice_email_template(
    recipient_name: str,
    invoice_id: str,
    order_id: str,
    amount: float,
    currency: str = "INR",
    items: list = None,
    transaction_date: str = None,
    payment_method: str = None
) -> str:
    """Generate HTML for invoice email."""
    items_html = ""
    if items:
        for item in items:
            items_html += f"""
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">{item.get('name', 'Item')}</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">{item.get('quantity', 1)}</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">{item.get('price', 0):,.2f}</td>
            </tr>
            """
    
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {{
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f5f5f5;
                margin: 0;
                padding: 20px;
            }}
            .container {{
                max-width: 600px;
                margin: 0 auto;
                background-color: white;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                overflow: hidden;
            }}
            .header {{
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                text-align: center;
            }}
            .header h1 {{
                margin: 0;
                font-size: 28px;
                font-weight: 600;
            }}
            .content {{
                padding: 30px;
            }}
            .invoice-section {{
                margin: 20px 0;
            }}
            .invoice-title {{
                font-size: 18px;
                font-weight: 600;
                color: #333;
                margin-bottom: 10px;
            }}
            table {{
                width: 100%;
                border-collapse: collapse;
                margin: 15px 0;
            }}
            th {{
                background-color: #f9f9f9;
                padding: 10px;
                text-align: left;
                font-weight: 600;
                border-bottom: 2px solid #667eea;
            }}
            .summary {{
                background-color: #f9f9f9;
                padding: 15px;
                border-radius: 4px;
                margin-top: 20px;
            }}
            .summary-row {{
                display: flex;
                justify-content: space-between;
                margin: 8px 0;
            }}
            .total {{
                font-size: 18px;
                font-weight: 600;
                color: #667eea;
                border-top: 2px solid #667eea;
                padding-top: 10px;
                margin-top: 10px;
            }}
            .footer {{
                background-color: #f5f5f5;
                padding: 20px;
                text-align: center;
                font-size: 12px;
                color: #999;
                border-top: 1px solid #ddd;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Invoice #{invoice_id}</h1>
            </div>
            <div class="content">
                <p>Hi {recipient_name},</p>
                <p>Thank you for your business! Here is your invoice for the recent transaction.</p>
                
                <div class="invoice-section">
                    <div class="invoice-title">Invoice Details</div>
                    <table>
                        <tr>
                            <td><strong>Invoice ID:</strong></td>
                            <td>{invoice_id}</td>
                        </tr>
                        <tr>
                            <td><strong>Order ID:</strong></td>
                            <td>{order_id}</td>
                        </tr>
                        {f'<tr><td><strong>Date:</strong></td><td>{transaction_date}</td></tr>' if transaction_date else ''}
                        {f'<tr><td><strong>Payment Method:</strong></td><td>{payment_method}</td></tr>' if payment_method else ''}
                    </table>
                </div>
                
                {f'<div class="invoice-section"><div class="invoice-title">Items</div><table><thead><tr><th>Description</th><th>Qty</th><th>Price</th></tr></thead><tbody>{items_html}</tbody></table></div>' if items_html else ''}
                
                <div class="summary">
                    <div class="summary-row">
                        <span>Subtotal:</span>
                        <span>{amount:,.2f} {currency}</span>
                    </div>
                    <div class="summary-row total">
                        <span>Total Amount:</span>
                        <span>{amount:,.2f} {currency}</span>
                    </div>
                </div>
                
                <p style="margin-top: 30px; color: #666;">If you have any questions regarding this invoice, please contact our support team.</p>
            </div>
            <div class="footer">
                <p>© 2024 L-Port. All rights reserved.</p>
                <p>This is an automated email, please do not reply.</p>
            </div>
        </div>
    </body>
    </html>
    """
