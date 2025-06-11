#!/bin/bash

# Production deployment script
set -e

echo "🚀 Starting production deployment..."

# Check if required environment variables are set
if [ -z "$DATABASE_URL" ]; then
  echo "❌ DATABASE_URL environment variable is required"
  exit 1
fi

# Load environment variables if .env.prod exists
if [ -f .env.prod ]; then
  echo "📝 Loading production environment variables..."
  export $(cat .env.prod | xargs)
fi

# Build and start services
echo "🏗️ Building Docker images..."
docker-compose -f docker-compose.prod.yml build --no-cache

echo "🔄 Stopping existing services..."
docker-compose -f docker-compose.prod.yml down

echo "🗄️ Starting database..."
docker-compose -f docker-compose.prod.yml up -d postgres

echo "⏳ Waiting for database to be ready..."
sleep 10

echo "📊 Running database migrations..."
docker-compose -f docker-compose.prod.yml run --rm api npm run db:push

echo "🌱 Seeding database (optional)..."
docker-compose -f docker-compose.prod.yml run --rm api npm run db:seed || echo "Seeding skipped or failed"

echo "🚀 Starting all services..."
docker-compose -f docker-compose.prod.yml up -d

echo "🏥 Waiting for services to be healthy..."
sleep 30

# Health checks
echo "🔍 Checking API health..."
curl -f http://localhost:3001/ || echo "API health check failed"

echo "🔍 Checking frontend health..."
curl -f http://localhost:3000/ || echo "Frontend health check failed"

echo "✅ Deployment completed!"
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 API: http://localhost:3001"
echo "📊 Database: localhost:5432"

echo "📋 To view logs: docker-compose -f docker-compose.prod.yml logs -f"
echo "🛑 To stop: docker-compose -f docker-compose.prod.yml down" 