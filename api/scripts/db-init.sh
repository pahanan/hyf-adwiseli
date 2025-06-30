#!/bin/bash

echo "🏗️ Initializing database schema..."
for file in /docker-entrypoint-initdb.d/[1-9]*_postgres_schema.sql; do
  echo "Running $file..."
  docker exec -i hyf-adwi-postgres psql -U root -d hyf-adwiseli-db -f $file
done
echo "✅ Schema initialization completed!" 