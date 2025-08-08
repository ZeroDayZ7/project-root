#!/bin/bash

echo "🧹 Usuwanie wszystkich folderów logs w projekcie..."

# Znajdź i usuń wszystkie foldery 'logs' w bieżącym katalogu i podkatalogach
find . -type d -name "logs" -exec rm -rf {} +

echo "✅ Gotowe!"