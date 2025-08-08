#!/bin/sh

pnpm --filter web run turbo &
pnpm --filter gateway run nodemon &
pnpm --filter auth-service run nodemon &
wait
