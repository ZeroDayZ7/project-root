#!/bin/bash
# build-prod.sh

# wychodzimy w razie błędu
set -e

# opcjonalnie czyścimy poprzedni build
rm -rf dist

# kompilacja TypeScript
tsc --project tsconfig.prod.json

# zamiana aliasów (jeśli używasz tsc-alias)
tsc-alias -p tsconfig.prod.json

echo "✅ Build finished"
