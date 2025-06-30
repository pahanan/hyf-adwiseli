#!/bin/bash

# View database logs
echo "📜 Showing database logs..."
echo "Press Ctrl+C to exit"
echo ""
docker-compose logs -f postgres redis 