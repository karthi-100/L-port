# L-Port Backend - Quick Reference Card

## 🚀 Getting Started (5 minutes)

### Windows
```bash
# 1. Run setup script
setup.bat

# 2. Edit .env with your credentials
# 3. Run server
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# 4. Open docs: http://localhost:8000/docs
```

### macOS/Linux
```bash
# 1. Run setup script
bash setup.sh

# 2. Edit .env with your credentials
# 3. Run server
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# 4. Open docs: http://localhost:8000/docs
```

## 📁 Project Structure

```
backend/
├── main.py                    # FastAPI App Entry Point
├── requirements.txt           # Python Dependencies
├── .env.example              # Environment Variables Template
├── render.yaml               # Render Deploy Config
├── Dockerfile                # Docker Config
├── docker-compose.yml        # Docker Compose
├── README.md                 # Full Documentation
├── DEPLOYMENT.md             # Deploy Guide
├── test_api.py              # Test Examples
│
├── config/settings.py        # Config Management
├── routes/payment.py         # Payment APIs
├── routes/mail.py           # Email APIs
├── services/payment.py       # Razorpay Service
├── services/mail.py         # Email Service
├── schemas/__init__.py      # Request/Response Models
├── utils/logger.py          # Logging Setup
└── utils/email_templates.py # Email Templates
```

## 🔌 API Endpoints (Quick Reference)

### Payment APIs
- `POST /payment/create-order` - Create payment order
- `POST /payment/verify` - Verify payment signature
- `POST /payment/refund` - Refund payment
- `GET /payment/status/{payment_id}` - Check payment status

### Email APIs
- `POST /mail/send-success` - Send success email
- `POST /mail/send-failure` - Send failure email
- `POST /mail/send-invoice` - Send invoice email

### Utility APIs
- `GET /health` - Health check
- `GET /` - API info
- `GET /docs` - Swagger UI
- `GET /redoc` - ReDoc UI

## 🔐 Environment Variables

```env
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=app_password_here
FRONTEND_URL=http://localhost:5173
```

## 💻 Development Commands

```bash
# Install dependencies
pip install -r requirements.txt

# Run development server (auto-reload)
uvicorn main:app --reload

# Run production server
uvicorn main:app --host 0.0.0.0 --port 8000

# Run tests
pytest test_api.py -v

# Format code
black .

# Lint code
flake8 .

# Check types
mypy .
```

## 🐳 Docker Commands

```bash
# Build image
docker build -t l-port-backend .

# Run container
docker run -p 8000:8000 --env-file .env l-port-backend

# Using docker-compose
docker-compose up --build
```

## 🚢 Deployment (Render)

1. Push to GitHub
2. Go to render.com → New Web Service
3. Connect GitHub repo
4. Set environment variables
5. Deploy!

**Your API**: `https://l-port-backend.onrender.com`

## 🧪 Testing Endpoints

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

## 📚 Key Files Explained

| File | Purpose |
|------|---------|
| `config/settings.py` | Configure app with environment variables |
| `routes/payment.py` | Payment API endpoints with error handling |
| `routes/mail.py` | Email API endpoints |
| `services/payment.py` | Razorpay integration logic |
| `services/mail.py` | SMTP email sending logic |
| `schemas/__init__.py` | Request/response validation models |
| `utils/logger.py` | Logging configuration |
| `utils/email_templates.py` | Beautiful HTML email templates |

## ⚙️ Configuration Files

| File | Purpose |
|------|---------|
| `render.yaml` | Deploy config for Render platform |
| `Dockerfile` | Container configuration |
| `docker-compose.yml` | Local Docker setup |
| `requirements.txt` | Python dependencies |
| `.env.example` | Environment variables template |
| `.gitignore` | Git ignore rules |

## 🔗 Frontend Integration

```javascript
// Example: Call payment API from frontend
const response = await fetch('http://localhost:8000/payment/create-order', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    amount: 50000,
    currency: 'INR',
    customer_email: 'user@example.com',
    customer_name: 'John Doe',
    customer_phone: '+919876543210'
  })
});
const order = await response.json();
```

## 🐛 Troubleshooting

**Email not sending?**
- Check SMTP credentials
- Verify Gmail app password
- Check firewall/antivirus

**Razorpay errors?**
- Verify API keys
- Check webhook secret
- Amount must be in paisa

**Deploy fails on Render?**
- Check build logs
- Verify environment variables
- Ensure Python 3.11+

## 📞 Support Resources

- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [Razorpay API](https://razorpay.com/docs/api/)
- [Render Docs](https://render.com/docs)
- [Pydantic Docs](https://docs.pydantic.dev/)

## ✅ Production Checklist

- [ ] Set `DEBUG=False` in production
- [ ] Use strong SMTP password
- [ ] Keep dependencies updated
- [ ] Monitor error logs
- [ ] Test payment verification
- [ ] Test email delivery
- [ ] Set up custom domain
- [ ] Enable HTTPS (auto on Render)
- [ ] Configure CORS properly
- [ ] Set up database for history (optional)

---

**Happy coding! 🎉**
