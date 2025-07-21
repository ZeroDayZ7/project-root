FROM node:24

WORKDIR /app

COPY ../../pnpm-lock.yaml ../../package.json ./
COPY ./package.json ./services/auth/package.json ./

RUN npm install -g pnpm && pnpm install --filter ./services/auth...

COPY . .

CMD ["pnpm", "dev"]
