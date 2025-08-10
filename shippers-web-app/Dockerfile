# Use official Python image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first to leverage Docker cache
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy all application files
COPY . .

# Expose the port Flask runs on
EXPOSE 5003

# Environment variables
ENV FLASK_APP=app.py
ENV FLASK_ENV=production

# Command to run the application
CMD ["gunicorn", "--bind", "0.0.0.0:5003", "wsgi:app"]