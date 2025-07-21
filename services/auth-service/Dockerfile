FROM node:24-alpine

WORKDIR /usr/src/app

# Kopiuj lockfile i root package.json (potrzebne do pnpm)
COPY pnpm-lock.yaml package.json ./

# Kopiuj package.json i tsconfig.json serwisu auth-service
COPY services/auth-service/package.json ./package.json
COPY services/auth-service/tsconfig.json ./tsconfig.json

# Instaluj pnpm i zależności tylko dla auth-service
RUN npm install -g pnpm && pnpm install --filter ./services/auth-service...

# Kopiuj cały kod serwisu auth-service
COPY services/auth-service ./ 

CMD ["pnpm", "run", "nodemon"]
