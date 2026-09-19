#!/bin/bash

set -e

echo "=================================================="
echo " Cleaning & Reinstalling Dependencies for Services"
echo "=================================================="

SERVICES=(
  "api-gateway"
  "auth-service"
  "booking-service"
  "inventory-service"
  "payment-service"
  "property-service"
  "search-service"
)

for SERVICE in "${SERVICES[@]}"
do
  echo ""
  echo "--------------------------------------------------"
  echo " Processing service: $SERVICE"
  echo "--------------------------------------------------"

  if [ -d "$SERVICE" ]; then
    cd "$SERVICE"

    echo "Cleaning node_modules and build artifacts..."
    rm -rf node_modules dist package-lock.json

    echo "Installing fresh dependencies..."
    npm install

    cd ..
  else
    echo "WARNING: Directory '$SERVICE' not found. Skipping..."
  fi
done

echo ""
echo "=================================================="
echo " Clean reinstall completed successfully!"
echo "=================================================="