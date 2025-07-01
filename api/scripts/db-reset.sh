#!/bin/bash

# Reset database and reseed
echo "🔄 Resetting database..."
docker-compose down -v

echo "🚀 Starting fresh database..."
docker-compose up -d postgres redis

echo "⏳ Waiting for database to be ready..."
sleep 15

echo "🏗️ Initializing database schema..."
for file in 1_auth_postgres_schema.sql \
 2_files_postgres_schema.sql \
 3_brand_postgres_schema.sql \
 4_campaign_postgres_schema.sql \
 5_notification_postgres_schema.sql \
 6_other_postgres_schema.sql \
 7_social_accounts_postgres_schema.sql \
 8_chat_postgres_schema.sql \
 9_video_postgres_schema.sql
 do
  echo "Running $file..."
  docker exec -i hyf-adwi-postgres psql -U root -d hyf-adwiseli-db -f /docker-entrypoint-initdb.d/$file
  if [ $? -ne 0 ]; then
    echo "❌ Error running $file"
    exit 1
  fi
done

echo "🌱 Seeding database with data..."
docker exec -i hyf-adwi-postgres psql -U root -d hyf-adwiseli-db -f /docker-entrypoint-initdb.d/10_data.sql

echo "✅ Database reset and seeded successfully!"
echo "📊 PostgreSQL: localhost:5435"
echo "🔴 Redis: localhost:6379"
