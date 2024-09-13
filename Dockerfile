FROM node:20-bookworm-slim

ARG DS_PORT
ENV DS_PORT=${DS_PORT:-3000}

WORKDIR /dwn-server

COPY package.json package-lock.json tsconfig.json entrypoint.sh ./
COPY src ./src

RUN npm install
RUN npm run build:esm

VOLUME /dwn-server/data

ENTRYPOINT [ "/dwn-server/entrypoint.sh" ]
EXPOSE ${DS_PORT}
