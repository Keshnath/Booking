#!/bin/bash

# =====================================================================
# NestJS 6-Service Launcher customized for Booking Workspace (Bash/WSL)
# Place this file inside your root "Booking" directory.
# =====================================================================

# 1. Your exact 6 service folder names from the screenshot
SERVICES=(
  "api-gateway"
  "auth-service"
  "booking-service"
  "inventory-service"
  "payment-service"
  "property-service"
  "pricing-service"
  "search-service"
)

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🚀 Starting 6 NestJS microservices in parallel development mode..."

# 2. Loop through each service and spin it up in its own background process
for SERVICE in "${SERVICES[@]}"; do
  SERVICE_PATH="$SCRIPT_DIR/$SERVICE"
  
  if [ -d "$SERVICE_PATH" ]; then
    echo "📂 Starting logs for: $SERVICE"
    
    # Run 'npm run start:dev' inside the folder, prefixing logs with the service name
    (cd "$SERVICE_PATH" && npm run start:dev 2>&1 | sed "s/^/[$SERVICE] /") &
  else
    echo "⚠️ Warning: Directory $SERVICE not found at $SERVICE_PATH"
  fi
done

echo "✅ All services dispatched! Logs will streams below. Press [Ctrl + C] to stop everything."

# 3. Clean exit: Keep the script alive to show logs, and kill all background tasks on Ctrl+C
trap "echo 'Stopping all microservices...'; kill 0" EXIT
wait
