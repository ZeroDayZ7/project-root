#!/bin/bash
set -e

clean_dist() {
  case "$OSTYPE" in
    msys*|cygwin*|linux*|darwin*)
      # Git Bash, Cygwin, Linux, macOS
      rm -rf dist
      ;;
    *)
      # inne systemy — usuwamy Node.js
      node -e "require('fs').rmSync('dist', { recursive: true, force: true })"
      ;;
  esac
}

echo "🧹 Cleaning dist..."
clean_dist

echo "📦 Compiling TypeScript..."
pnpm tsc

echo "🔗 Linking CLI globally..."
pnpm link -g

echo "✅ Build completed!"
