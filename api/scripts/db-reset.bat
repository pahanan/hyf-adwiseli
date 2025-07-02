@echo off
echo 🔄 Resetting database...
docker-compose down -v

echo 🚀 Starting fresh database...
docker-compose up -d postgres redis

echo ⏳ Waiting for database to be ready...
ping -n 15 127.0.0.1 > nul

echo 🏗️ Initializing database schema...
docker exec -i hyf-adwi-postgres psql -U root -d hyf-adwiseli-db -f /docker-entrypoint-initdb.d/1_auth_postgres_schema.sql
docker exec -i hyf-adwi-postgres psql -U root -d hyf-adwiseli-db -f /docker-entrypoint-initdb.d/2_files_postgres_schema.sql
docker exec -i hyf-adwi-postgres psql -U root -d hyf-adwiseli-db -f /docker-entrypoint-initdb.d/3_brand_postgres_schema.sql
docker exec -i hyf-adwi-postgres psql -U root -d hyf-adwiseli-db -f /docker-entrypoint-initdb.d/4_campaign_postgres_schema.sql
docker exec -i hyf-adwi-postgres psql -U root -d hyf-adwiseli-db -f /docker-entrypoint-initdb.d/5_notification_postgres_schema.sql
docker exec -i hyf-adwi-postgres psql -U root -d hyf-adwiseli-db -f /docker-entrypoint-initdb.d/6_other_postgres_schema.sql
docker exec -i hyf-adwi-postgres psql -U root -d hyf-adwiseli-db -f /docker-entrypoint-initdb.d/7_social_accounts_postgres_schema.sql
docker exec -i hyf-adwi-postgres psql -U root -d hyf-adwiseli-db -f /docker-entrypoint-initdb.d/8_chat_postgres_schema.sql
docker exec -i hyf-adwi-postgres psql -U root -d hyf-adwiseli-db -f /docker-entrypoint-initdb.d/9_video_postgres_schema.sql

echo 🌱 Seeding database with data...
docker exec -i hyf-adwi-postgres psql -U root -d hyf-adwiseli-db -f /docker-entrypoint-initdb.d/10_data.sql

echo ✅ Database reset and seeded successfully!
echo 📊 PostgreSQL: localhost:5435
echo 🔴 Redis: localhost:6379 