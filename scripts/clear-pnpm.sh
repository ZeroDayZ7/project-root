#!/bin/bash

echo "🧹 Usuwanie node_modules, .pnpm i pnpm-lock.yaml..."

# Główne foldery
rm -rf node_modules .pnpm pnpm-lock.yaml

# Wszystkie workspace'y
rm -rf apps/web/node_modules
rm -rf apps/gateway/node_modules
rm -rf services/auth-service/node_modules
rm -rf services/logs-service/node_modules
rm -rf services/notification-service/node_modules
rm -rf services/users-service/node_modules
rm -rf packages/common/node_modules
rm -rf packages/ui/node_modules

echo "✅ Gotowe!"
