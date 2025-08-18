#!/bin/sh
APP_VERSION=$(node -p "require('./package.json').version")
export APP_VERSION

echo "APP_VERSION is $APP_VERSION"

nodemon
# nodemon --exec "node --trace-deprecation -r tsx src/index.ts"