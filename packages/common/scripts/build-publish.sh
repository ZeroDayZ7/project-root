#!/bin/bash
# build-publish.sh
set -e

# 1️⃣ Czyścimy poprzedni build
echo "🧹 Czyszczenie dist..."
rm -rf dist

# 2️⃣ Zwiększamy patch wersji w package.json
echo "🔢 Aktualizacja wersji..."
CURRENT_VERSION=$(node -p "require('./package.json').version")
IFS='.' read -r MAJOR MINOR PATCH <<< "$CURRENT_VERSION"
PATCH=$((PATCH+1))
NEW_VERSION="$MAJOR.$MINOR.$PATCH"
# aktualizacja package.json
jq ".version=\"$NEW_VERSION\"" package.json > package.tmp.json && mv package.tmp.json package.json
echo "Nowa wersja: $NEW_VERSION"

# 3️⃣ Budujemy paczkę
echo "🔨 Budowanie paczki..."
tsup

# 4️⃣ Publikujemy na GitHub Package Registry
echo "🚀 Publikacja paczki..."
pnpm publish --registry=https://npm.pkg.github.com

echo "✅ Paczka $NEW_VERSION została opublikowana!"
