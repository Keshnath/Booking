#!/bin/bash

set -e

echo "======================================"
echo "Installing dependencies for services"
echo "======================================"

SERVICES=(
  "api-gateway"
  "auth-service"
  "booking-service"
  "inventory-service"
  "payment-service"
  "property-service"
)

for SERVICE in "${SERVICES[@]}"
do
  echo ""
  echo "--------------------------------------"
  echo "Installing dependencies: $SERVICE"
  echo "--------------------------------------"

  if [ -d "$SERVICE" ]; then
    cd "$SERVICE"

    npm install

    cd ..
  else
    echo "WARNING: Directory '$SERVICE' not found. Skipping..."
  fi
done

echo ""
echo "======================================"
echo "All dependencies installed successfully!"
echo "======================================"