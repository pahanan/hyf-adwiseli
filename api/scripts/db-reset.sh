#!/bin/bash

# Reset database and reseed
echo "🔄 Resetting database..."
docker-compose down -v

echo "🚀 Starting fresh database..."
docker-compose up -d postgres redis

echo "⏳ Waiting for database to be ready..."
sleep 15

echo "🏗️ Initializing database schema..."
for file in /docker-entrypoint-initdb.d/[1-9]*_postgres_schema.sql; do
  echo "Running $file..."
  docker exec -i hyf-adwi-postgres psql -U root -d hyf-adwiseli-db -f $file
done

echo "🌱 Seeding database with data..."
docker exec -i hyf-adwi-postgres psql -U root -d hyf-adwiseli-db -f /docker-entrypoint-initdb.d/10_data.sql

echo "✅ Database reset and seeded successfully!"
echo "📊 PostgreSQL: localhost:5435"
echo "🔴 Redis: localhost:6379" 