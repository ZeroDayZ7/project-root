#!/bin/bash
# ===============================
# merge.sh
# Łączy wszystkie pliki .go w katalogu w jeden plik merged.txt
# Jak uruchomić: ./merge.sh [ścieżka_do_katalogu]
# Parametry:
#   [ścieżka] - katalog startowy (domyślnie ".")
# ===============================

# Podstawa nazwy pliku wynikowego
BASE="merged"
EXT=".txt"
OUTPUT="$BASE$EXT"

# Jeśli plik już istnieje, zwiększamy numer
COUNTER=1
while [ -f "$OUTPUT" ]; do
  OUTPUT="${BASE}${COUNTER}${EXT}"
  COUNTER=$((COUNTER + 1))
done

# Tworzymy pusty plik wynikowy
> "$OUTPUT"

# Iterujemy po wszystkich plikach .go
find . -type f -name "*.go" | while read -r file; do
  echo "=============== $file ===============" >> "$OUTPUT"
  cat "$file" >> "$OUTPUT"
  echo -e "\n" >> "$OUTPUT"
done

echo "✅ Plik został wygenerowany: $OUTPUT"
