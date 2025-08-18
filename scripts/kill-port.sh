#!/bin/bash

# Funkcja formatowania nagłówków
print_header() {
  echo -e "\n\033[1;34m$1\033[0m"
}

# Pobranie portu
if [ -z "$1" ]; then
  read -p "Podaj port: " PORT
else
  PORT=$1
fi

# Wykrycie systemu
OS=$(uname -s)

if [[ "$OS" == "Linux" || "$OS" == "Darwin" ]]; then
  # Linux / Mac
  PID=$(lsof -i :$PORT -t 2>/dev/null)

  if [ -z "$PID" ]; then
    echo -e "\033[1;31m❌ Żaden proces nie używa portu $PORT\033[0m"
    exit 1
  fi

  print_header "✅ Proces używający portu $PORT:"
  ps -p $PID -o pid,ppid,user,%cpu,%mem,etime,cmd

  read -p "Chcesz zabić ten proces? (y/n): " CONFIRM
  if [[ "$CONFIRM" =~ ^[Yy]$ ]]; then
    kill -9 $PID
    echo -e "\033[1;31m💀 Proces $PID został zabity\033[0m"
  else
    echo -e "\033[1;32m👌 Proces pozostawiony\033[0m"
  fi

else
  # Windows (Git Bash)
  # Znajdź PID (unikając problemu ze spacjami)
  PID=$(netstat -ano | grep ":$PORT" | awk '{print $NF}' | head -n 1 | tr -d '\r')

  if [ -z "$PID" ]; then
    echo -e "\033[1;31m❌ Żaden proces nie używa portu $PORT\033[0m"
    exit 1
  fi

  print_header "✅ Proces używający portu $PORT: $PID"

  # Wyświetl podstawowe info przez tasklist
  tasklist /FI "PID eq $PID" /FO LIST

  # Wyświetl pełną ścieżkę i czas startu przez PowerShell
  powershell.exe -NoProfile -Command \
    "Get-Process -Id $PID | Select-Object Id,ProcessName,@{Name='Path';Expression={\$_.Path}},StartTime | Format-List"

  read -p "Chcesz zabić ten proces? (y/n): " CONFIRM
  if [[ "$CONFIRM" =~ ^[Yy]$ ]]; then
    taskkill //PID $PID //F
    echo -e "\033[1;31m💀 Proces $PID został zabity\033[0m"
  else
    echo -e "\033[1;32m👌 Proces pozostawiony\033[0m"
  fi
fi
