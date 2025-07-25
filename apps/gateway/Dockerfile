FROM node:24-alpine

WORKDIR /usr/src/app

COPY ./project-root/pnpm-lock.yaml ./pnpm-lock.yaml
COPY ./project-root/package.json ./package.json
COPY ./project-root/pnpm-workspace.yaml ./pnpm-workspace.yaml

RUN npm install -g pnpm

RUN pnpm install

COPY ./project-root/apps/gateway ./apps/gateway

WORKDIR /usr/src/app/apps/gateway

CMD ["pnpm", "run", "dev"]
