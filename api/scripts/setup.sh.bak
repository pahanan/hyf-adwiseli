#!/bin/bash

set -e

echo "📦 Installing dependencies..."
npm install

echo "📝 Copying env.example to .env..."
cp env.example .env

echo "🚀 Starting database services..."
./scripts/db-start.sh

echo "⏳ Waiting for database to be ready..."
sleep 15

echo "🏗️ Initializing database schema..."
./scripts/db-init.sh

echo "🌱 Seeding database with data..."
docker exec -i hyf-adwi-postgres psql -U root -d hyf-adwiseli-db -f /docker-entrypoint-initdb.d/10_data.sql

echo "✅ Setup complete! You are ready to go!" 