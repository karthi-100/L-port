# Deployment Guide - L-Port Backend

This guide covers deploying the L-Port Backend to Render for free.

## Prerequisites

- GitHub account with repository access
- Render account (free)
- Razorpay account (test mode available)
- Gmail account with app password

## Step-by-Step Deployment

### 1. Prepare Your Code

```bash
# Ensure all code is committed
git add .
git commit -m "Add L-Port FastAPI backend"
git push origin main
```

### 2. Create Render Service

1. Go to [render.com](https://render.com)
2. Sign in with GitHub
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub repo
5. Fill in the form:

| Field | Value |
|-------|-------|
| Name | `l-port-backend` |
| Region | Select closest to your users |
| Branch | `main` |
| Runtime | `Python 3` |
| Build Command | `pip install -r requirements.txt` |
| Start Command | `uvicorn main:app --host 0.0.0.0 --port $PORT` |

6. Click **"Create Web Service"**

### 3. Configure Environment Variables

After service is created:

1. Go to **"Environment"** tab
2. Add the following variables:

```env
DEBUG=False
HOST=0.0.0.0
PORT=8000
LOG_LEVEL=INFO
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SENDER_NAME=L-Port Support
SUPPORT_EMAIL=support@l-port.com
FRONTEND_URL=https://your-frontend-domain.com
BACKEND_URL=https://l-port-backend.onrender.com
```

3. Click **"Save"**

### 4. Wait for Deployment

- Building takes 5-10 minutes
- Watch the logs for any errors
- Once active, you'll get a URL: `https://l-port-backend.onrender.com`

### 5. Test Your Deployment

```bash
# Health check
curl https://l-port-backend.onrender.com/health

# Access Swagger docs
https://l-port-backend.onrender.com/docs
```

## Getting Credentials

### Razorpay

1. Sign up at [razorpay.com](https://razorpay.com)
2. Dashboard → Settings → API Keys
3. Copy Key ID and Secret
4. Add your website URL to Webhooks

**Test Credentials** (for sandbox):
- Use test key ID and secret
- Test card number: 4111 1111 1111 1111

### Gmail App Password

1. Enable 2-Factor Authentication on your Google Account
2. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Select "Mail" and "Windows Computer" (doesn't matter on Render)
4. Copy the 16-character password
5. Use this in `SMTP_PASSWORD`

## Deployment Architecture

```
GitHub Repository
       ↓
   (push)
       ↓
   Render (Deployment Platform)
       ├→ Build: pip install
       ├→ Run: uvicorn
       └→ Expose: HTTPS URL
       ↓
   Your API Live at: https://l-port-backend.onrender.com
```

## Auto-Deploy from GitHub

Render automatically redeploys when you push to `main`:

```bash
# Make changes
git add .
git commit -m "Update API"
git push origin main

# Automatic deployment starts
# Check Render dashboard → Deploys
```

## Monitoring

### View Logs

1. Go to Render Dashboard
2. Select your service
3. Click **"Logs"** tab
4. Watch real-time logs as requests come in

### Common Issues

**Build fails:**
- Check Python version (3.11+)
- Verify all dependencies in `requirements.txt`
- Check logs for missing packages

**Service crashes:**
- Check environment variables are set correctly
- Verify credentials (Razorpay, Gmail)
- Check logs for startup errors

**Email not sending:**
- Verify Gmail app password (not regular password)
- Check SMTP credentials in environment
- Ensure 2FA is enabled on Gmail

## Scaling to Production

### Custom Domain

1. In Render dashboard → Settings
2. Add custom domain: `api.yourdomain.com`
3. Update your frontend CORS URL
4. Update environment variables

### Enable Paid Plan

For reliability:
- Upgrade from free to paid plan
- Get dedicated resources
- Better uptime SLA
- Priority support

### Add PostgreSQL Database

1. Create new PostgreSQL service on Render
2. Add DATABASE_URL to environment
3. Migrate your app to use database

```python
# In services/payment.py (example)
from sqlalchemy import create_engine

engine = create_engine(settings.DATABASE_URL)
```

## Troubleshooting

### Service goes to sleep (free tier)

Free tier services sleep after 15 min of inactivity. To prevent:
- Upgrade to paid plan
- Use a monitoring service to ping endpoint

### Out of memory errors

Free tier has limited RAM:
- Optimize code
- Reduce logging verbosity
- Consider paid plan

### Deploy takes too long

- Reduce dependencies if possible
- Use `poetry` or `pipenv` for faster installs
- Check Render load

## Cost Estimation

| Component | Cost (Monthly) |
|-----------|---|
| Web Service (Free) | $0 |
| Web Service (Pro) | $7+ |
| Database (free) | $0 |
| Database (paid) | $15+ |

**Free tier** is sufficient for:
- Development and testing
- Low-traffic applications
- Portfolio projects

## Next Steps

1. **Frontend Integration**: Update CORS_ORIGIN in frontend
2. **Custom Domain**: Set up domain on Render
3. **Database**: Add PostgreSQL for persistence
4. **Monitoring**: Set up error tracking (Sentry)
5. **Analytics**: Add API analytics

## Support

- [Render Docs](https://render.com/docs)
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [Razorpay Docs](https://razorpay.com/docs/api/)

---

**Happy deploying! 🚀**
