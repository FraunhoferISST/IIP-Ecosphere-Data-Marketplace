FROM node:14.19.3-alpine3.16 as builder

ENV NODE_ENV production

WORKDIR /usr/src/app
COPY --chown=node:node . .

RUN yarn install \
  --prefer-offline \
  --non-interactive \
  --pure-lockfile \
  --production=true

RUN yarn cache clean --all

RUN npm prune --production

RUN yarn autoclean --init && yarn autoclean -F

FROM node:14.19.3-alpine3.16

COPY --from=builder /usr/src/app  ./app

WORKDIR app

USER node
CMD ["node", "--experimental-modules", "--experimental-json-modules", "index.js"]
