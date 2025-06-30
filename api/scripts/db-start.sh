#!/bin/bash

# Start database services
echo "🚀 Starting database services..."
docker-compose up -d postgres redis

echo "⏳ Waiting for services to be ready..."
sleep 10

echo "✅ Database services started!"
echo "📊 PostgreSQL: localhost:5435"
echo "🔴 Redis: localhost:6379"
echo ""
echo "To view logs: npm run db:logs"
echo "To stop services: npm run db:stop" 