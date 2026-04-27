#!/bin/bash
# Quick start script for L-Port Backend

set -e

echo "======================================"
echo "    L-Port Backend Quick Start    "
echo "======================================"
echo ""

# Check Python version
echo "✓ Checking Python version..."
python --version

# Create virtual environment
echo ""
echo "✓ Creating virtual environment..."
if [ ! -d "venv" ]; then
    python -m venv venv
    echo "  Virtual environment created"
else
    echo "  Virtual environment already exists"
fi

# Activate virtual environment
echo ""
echo "✓ Activating virtual environment..."
if [ -f "venv/bin/activate" ]; then
    source venv/bin/activate
elif [ -f "venv/Scripts/activate" ]; then
    source venv/Scripts/activate
fi

# Install dependencies
echo ""
echo "✓ Installing dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# Create .env if not exists
echo ""
echo "✓ Checking environment configuration..."
if [ ! -f ".env" ]; then
    echo "  Creating .env file from template..."
    cp .env.example .env
    echo "  ⚠️  IMPORTANT: Edit .env with your credentials!"
else
    echo "  .env file already exists"
fi

# Show next steps
echo ""
echo "======================================"
echo "    ✓ Setup Complete!    "
echo "======================================"
echo ""
echo "Next steps:"
echo ""
echo "1. Edit your .env file with credentials:"
echo "   - RAZORPAY_KEY_ID"
echo "   - RAZORPAY_KEY_SECRET"
echo ""
echo "2. Run the development server:"
echo "   uvicorn main:app --reload --host 0.0.0.0 --port 8000"
echo ""
echo "3. Open Swagger docs:"
echo "   http://localhost:8000/docs"
echo ""
echo "======================================"
