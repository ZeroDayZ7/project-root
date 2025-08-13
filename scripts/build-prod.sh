#!/bin/sh
# build-prod.sh

# Uruchamia backend Gateway
pnpm --filter gateway build:prod &

# Uruchamia backend Auth service
pnpm --filter auth-service build:prod &

# Czeka aż wszystkie procesy się zakończą
wait
