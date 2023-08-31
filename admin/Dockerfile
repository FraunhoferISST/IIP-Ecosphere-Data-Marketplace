FROM node:18-alpine as builder

WORKDIR /app

COPY admin ./admin
COPY shared ./shared

WORKDIR /app/admin

RUN NODE_ENV=production yarn install \
  --prefer-offline \
  --non-interactive \
  --production=false

RUN yarn build

FROM node:18-alpine

COPY --from=builder /app/admin/.output  .

ENV NUXT_HOST=0.0.0.0

ENTRYPOINT ["node", "server/index.mjs"]