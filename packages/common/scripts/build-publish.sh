#!/bin/bash
# build-publish.sh
set -e

# 1️⃣ Czyścimy poprzedni build
echo "🧹 Czyszczenie dist..."
rm -rf dist

# 2️⃣ Zwiększamy patch wersji w package.json
echo "🔢 Zwiększanie wersji paczki..."
pnpm version patch

# 3️⃣ Budujemy paczkę
echo "🔨 Budowanie paczki..."
tsup

git add .
git commit -m "build: prepare @neo/common for publish"

# 4️⃣ Publikujemy na GitHub Package Registry
echo "🚀 Publikacja paczki..."
pnpm publish --registry=https://npm.pkg.github.com

echo "✅ Paczka $NEW_VERSION została opublikowana!"
