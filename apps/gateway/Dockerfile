FROM node:24-alpine

WORKDIR /usr/src/app

RUN npm install -g pnpm nodemon tsx
COPY ./project-root/pnpm-lock.yaml ./pnpm-lock.yaml
COPY ./project-root/package.json ./package.json
COPY ./project-root/pnpm-workspace.yaml ./pnpm-workspace.yaml

RUN pnpm install

WORKDIR /usr/src/app/apps/gateway