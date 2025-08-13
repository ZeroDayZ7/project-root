#!/bin/bash
# build-prod.sh

# wychodzimy w razie błędu
set -e

# opcjonalnie czyścimy poprzedni build
echo "🧹 Czyszczenie dist..."
rm -rf dist

# kompilacja TypeScript
echo "🔄 Kompilacja ..."
tsup

echo "✅ Build zakończony"