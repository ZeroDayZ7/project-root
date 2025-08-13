#!/bin/bash
# build-prod.sh

# wychodzimy w razie błędu
set -e

# opcjonalnie czyścimy poprzedni build
rm -rf dist

# kompilacja TypeScript
echo "🔄 Kompilacja TypeScript..."
tsc --project tsconfig.build.json

# zamiana aliasów
echo "🔄 Zamiana aliasów za pomocą tsc-alias..."
tsc-alias -p tsconfig.build.json

echo "✅ Build zakończony - gateway"