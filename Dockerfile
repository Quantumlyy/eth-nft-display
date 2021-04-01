FROM node:15-alpine AS base

WORKDIR /base

COPY package*.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

FROM base AS build

ENV NODE_ENV=production

WORKDIR /build
COPY --from=base /base ./

RUN yarn run build

FROM node:15-alpine AS production

ENV NODE_ENV=production

WORKDIR /app
COPY --from=build /build/package*.json ./
COPY --from=build /build/yarn.lock ./
COPY --from=build /build/.next ./.next
COPY --from=build /build/public ./public

RUN yarn add next

EXPOSE 3000

CMD ["yarn", "run", "start"]
