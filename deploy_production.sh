#!/bin/bash

# Run docker compose build command
docker-compose build database backend proxy

# Start 3 containers and wait for them to finish running
docker-compose up -d database backend proxy
echo "Waiting for containers to finish running..."
while [ $(docker-compose ps -q database backend proxy | wc -l) -ne 3 ]; do
  sleep 1
done

# Build and start frontend container
docker-compose build frontend
docker-compose up -d frontend