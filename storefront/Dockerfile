FROM node:16.14.0-alpine3.15 as builder

WORKDIR /app

COPY ./shared ./shared
COPY ./storefront/ ./storefront

WORKDIR /app/storefront

RUN yarn install --non-interactive --prefer-offline

RUN yarn build

RUN rm -rf node_modules && \
  NODE_ENV=production yarn install \
  --prefer-offline \
  --pure-lockfile \
  --non-interactive \
  --production=true

RUN yarn cache clean --all

FROM node:16.14.0-alpine3.15

ENV NODE_ENV=production
ENV NUXT_VERSION=2.15.6

WORKDIR /app

COPY --from=builder /app/storefront/packages/theme/.nuxt  packages/theme/.nuxt
COPY --from=builder /app/storefront/packages/theme/static  packages/theme/static
COPY --from=builder /app/storefront/packages/theme/package.json  packages/theme/package.json
COPY --from=builder /app/storefront/packages/theme/nuxt.config.js  packages/theme/nuxt.config.js
COPY --from=builder /app/storefront/packages/theme/middleware.config.js packages/theme/middleware.config.js
COPY --from=builder /app/storefront/packages/api-client/server packages/api-client/server
COPY --from=builder /app/storefront/packages/api-client/lib packages/api-client/lib
COPY --from=builder /app/storefront/packages/composables/lib packages/composables/lib
COPY --from=builder /app/storefront/node_modules node_modules

WORKDIR /app/packages/theme

ENV NUXT_HOST=0.0.0.0

ENTRYPOINT ["npx", "nuxt-start"]
