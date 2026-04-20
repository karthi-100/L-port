# L-Port Backend API

Production-ready FastAPI backend for Razorpay payment integration and email sending.

## 🎯 Features

- ✅ **Razorpay Payment Integration** - Create orders, verify payments, refund transactions
- ✅ **Email Notifications** - Send beautiful HTML emails for payment success/failure/invoices
- ✅ **Gmail SMTP Support** - Send emails via Gmail with app passwords
- ✅ **Production Ready** - Proper error handling, logging, and exception management
- ✅ **CORS Enabled** - Frontend integration ready
- ✅ **Async FastAPI** - High-performance async routes
- ✅ **Swagger Docs** - Auto-generated API documentation
- ✅ **Render Deployment Ready** - Deploy for free on Render
- ✅ **Environment Configuration** - Secure environment variable management
- ✅ **Modular Architecture** - Clean separation of concerns

## 🚀 Quick Start

### Prerequisites

- Python 3.11+
- pip or conda
- Virtual environment (recommended)

### Installation

1. **Clone the repository** (if not already done):
```bash
cd backend
```

2. **Create virtual environment**:
```bash
# Using venv
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

3. **Install dependencies**:
```bash
pip install -r requirements.txt
```

4. **Configure environment variables**:
```bash
# Copy example to .env
cp .env.example .env

# Edit .env with your credentials
# nano .env  (or use your editor)
```

5. **Run the development server**:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

6. **Access the API**:
- Swagger Docs: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
- API Health: http://localhost:8000/health

## 📋 Configuration

### Environment Variables (.env)

```env
# Application
DEBUG=False
HOST=0.0.0.0
PORT=8000
LOG_LEVEL=INFO

# Razorpay
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# Email (Gmail SMTP)
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=app_password_here
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587

# CORS
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:8000
```

### Getting Credentials

#### Razorpay
1. Sign up at [Razorpay](https://razorpay.com)
2. Go to Settings → API Keys
3. Copy Key ID and Key Secret
4. Add your website URL in Webhooks section

#### Gmail SMTP
1. Enable 2-Factor Authentication in your Google Account
2. Go to [App Passwords](https://myaccount.google.com/apppasswords)
3. Select "Mail" and "Windows Machine"
4. Copy the 16-character password
5. Use this password in SMTP_PASSWORD

## 🔌 API Endpoints

### Payment APIs

#### 1. Create Order
```http
POST /payment/create-order
Content-Type: application/json

{
  "amount": 50000,
  "currency": "INR",
  "customer_email": "customer@example.com",
  "customer_name": "John Doe",
  "customer_phone": "+919876543210",
  "order_id": "ORDER_123",
  "description": "Product payment"
}
```

**Response**:
```json
{
  "status": "success",
  "order_id": "order_r4...",
  "amount": 50000,
  "currency": "INR",
  "message": "Order created successfully"
}
```

#### 2. Verify Payment
```http
POST /payment/verify
Content-Type: application/json

{
  "razorpay_order_id": "order_r4...",
  "razorpay_payment_id": "pay_...",
  "razorpay_signature": "signature_..."
}
```

#### 3. Refund Payment
```http
POST /payment/refund
Content-Type: application/json

{
  "payment_id": "pay_...",
  "amount": 25000,
  "reason": "Customer request"
}
```

#### 4. Get Payment Status
```http
GET /payment/status/{payment_id}
```

### Email APIs

#### 1. Send Success Email
```http
POST /mail/send-success
Content-Type: application/json

{
  "recipient_email": "customer@example.com",
  "recipient_name": "John Doe",
  "order_id": "ORDER_123",
  "payment_id": "pay_...",
  "amount": 500.00,
  "currency": "INR"
}
```

#### 2. Send Failure Email
```http
POST /mail/send-failure
Content-Type: application/json

{
  "recipient_email": "customer@example.com",
  "recipient_name": "John Doe",
  "order_id": "ORDER_123",
  "reason": "Card declined"
}
```

#### 3. Send Invoice Email
```http
POST /mail/send-invoice
Content-Type: application/json

{
  "recipient_email": "customer@example.com",
  "recipient_name": "John Doe",
  "invoice_id": "INV_001",
  "order_id": "ORDER_123",
  "amount": 500.00,
  "currency": "INR",
  "items": [
    {"name": "Product A", "quantity": 1, "price": 300.00},
    {"name": "Product B", "quantity": 2, "price": 100.00}
  ]
}
```

## 📁 Project Structure

```
backend/
├── main.py                 # FastAPI application entry point
├── requirements.txt        # Python dependencies
├── .env.example           # Environment variables template
├── render.yaml            # Render deployment config
├── README.md              # This file
│
├── config/                # Configuration management
│   ├── __init__.py
│   └── settings.py        # Settings and environment variables
│
├── routes/                # API route handlers
│   ├── __init__.py
│   ├── payment.py         # Payment endpoints
│   └── mail.py            # Email endpoints
│
├── services/              # Business logic
│   ├── __init__.py
│   ├── payment.py         # Razorpay service
│   └── mail.py            # Email service
│
├── schemas/               # Pydantic models
│   └── __init__.py        # Request/response schemas
│
└── utils/                 # Utility functions
    ├── __init__.py
    ├── logger.py          # Logging setup
    └── email_templates.py # HTML email templates
```

## 🧪 Testing

### Manual Testing with cURL

```bash
# Health check
curl http://localhost:8000/health

# Create order
curl -X POST http://localhost:8000/payment/create-order \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 50000,
    "currency": "INR",
    "customer_email": "test@example.com",
    "customer_name": "Test User",
    "customer_phone": "+919876543210"
  }'

# Send success email
curl -X POST http://localhost:8000/mail/send-success \
  -H "Content-Type: application/json" \
  -d '{
    "recipient_email": "test@example.com",
    "recipient_name": "Test User",
    "order_id": "ORDER_123",
    "payment_id": "pay_123",
    "amount": 500.00
  }'
```

### Using Swagger UI

1. Open http://localhost:8000/docs
2. Click on any endpoint to expand
3. Click "Try it out"
4. Fill in the request body
5. Click "Execute"

## 🚢 Deployment on Render

### Step 1: Prepare Your Repository

```bash
# Push code to GitHub
git add .
git commit -m "Add FastAPI backend"
git push origin main
```

### Step 2: Create Render Service

1. Go to [Render.com](https://render.com)
2. Sign up with GitHub account
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Fill in the form:
   - **Name**: `l-port-backend`
   - **Region**: Select closest to your users
   - **Branch**: `main`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Step 3: Configure Environment Variables

In Render Dashboard:
1. Go to your service
2. Click "Environment"
3. Add all variables from `.env.example`:
   ```
   DEBUG=False
   LOG_LEVEL=INFO
   RAZORPAY_KEY_ID=your_key
   RAZORPAY_KEY_SECRET=your_secret
   SMTP_EMAIL=your_email@gmail.com
   SMTP_PASSWORD=your_app_password
   FRONTEND_URL=https://your-frontend.com
   ```

### Step 4: Deploy

1. Click "Connect" to deploy
2. Wait for build to complete (5-10 minutes)
3. Your API will be live at: `https://your-service-name.onrender.com`

## 🔐 Security Best Practices

- ✅ Never commit `.env` file (already in .gitignore)
- ✅ Use environment variables for all secrets
- ✅ Enable HTTPS (auto on Render)
- ✅ Keep dependencies updated
- ✅ Use strong Razorpay webhook secret
- ✅ Validate all input data
- ✅ Log security events

## 📊 Monitoring

### View Logs

```bash
# Local development
# Check uvicorn output in terminal

# Render deployment
# Visit: https://dashboard.render.com → Your Service → Logs
```

### Health Check

```bash
curl https://your-backend.onrender.com/health
```

## 🐛 Troubleshooting

### Email not sending?

- Check SMTP credentials in `.env`
- Verify Gmail app password is correct
- Ensure 2FA is enabled on Gmail
- Check firewall/antivirus isn't blocking port 587
- Review logs for SMTP errors

### Razorpay errors?

- Verify Key ID and Secret are correct
- Check webhook secret configuration
- Ensure amount is in paisa (not rupees)
- Review Razorpay dashboard for failed transactions

### Deployment issues?

- Check build logs in Render dashboard
- Ensure all environment variables are set
- Verify Python version is 3.11+
- Check GitHub repository access is granted

## 📚 Documentation

- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [Razorpay API Docs](https://razorpay.com/docs/api/)
- [Pydantic v2 Docs](https://docs.pydantic.dev/latest/)
- [Render Docs](https://render.com/docs)

## 💡 Next Steps

1. **Frontend Integration**: Connect to your React/Vue frontend
2. **Webhooks**: Implement Razorpay webhooks for real-time updates
3. **Database**: Add PostgreSQL for transaction history
4. **Analytics**: Integrate Sentry for error tracking
5. **Testing**: Add comprehensive test suite

## 📝 License

MIT License - Feel free to use this project

## 🤝 Support

For issues and questions:
- Check troubleshooting section above
- Review API documentation
- Check Render service logs
- Open an issue on GitHub

---

**Happy deploying! 🚀**
