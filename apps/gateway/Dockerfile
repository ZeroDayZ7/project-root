FROM node:24-alpine

WORKDIR /app

COPY ./pnpm-lock.yaml ./package.json ./

RUN npm install -g pnpm && pnpm install --filter ./services/auth...

COPY . .

CMD ["pnpm", "dev"]