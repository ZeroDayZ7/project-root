#!/bin/bash
set -e

echo "🧹 Cleaning all node_modules, .pnpm and pnpm-lock.yaml files..."

# Usuń główne foldery
rm -rf node_modules .pnpm pnpm-lock.yaml

# Znajdź i usuń wszystkie node_modules w podkatalogach
find . -type d -name node_modules -prune -exec rm -rf '{}' +

# Usuń wszystkie pnpm-lock.yaml w podkatalogach
find . -type f -name pnpm-lock.yaml -exec rm -f '{}' +

echo "📦 Installing dependencies..."
pnpm install

echo "✅ Done!"
