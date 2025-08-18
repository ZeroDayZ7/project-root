#!/bin/sh

pnpm --filter gateway run start:dev &&
pnpm --filter auth-service run start:dev &&
wait
