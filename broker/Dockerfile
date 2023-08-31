FROM node:18-alpine as builder

ARG baseURL
ENV NUXT_BROKER_APP_BASE_URL $baseURL

WORKDIR /app

COPY --chown=node:node broker ./broker
COPY --chown=node:node shared ./shared

WORKDIR /app/broker

RUN NODE_ENV=production yarn install \
  --prefer-offline \
  --non-interactive \
  --production=false

RUN yarn build

FROM node:18-alpine

COPY --chown=node:node --from=builder /app/broker/.output  .

ENV NUXT_HOST=0.0.0.0

ENTRYPOINT ["node", "server/index.mjs"]
