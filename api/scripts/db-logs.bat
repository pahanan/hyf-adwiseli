@echo off
echo 📋 Viewing database logs...
echo Press Ctrl+C to exit
echo.
docker-compose logs -f postgres redis 