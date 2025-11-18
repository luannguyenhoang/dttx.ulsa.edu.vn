FROM node:22.16.0-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
RUN npm i sharp

FROM node:22.16.0-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

FROM node:22.16.0-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV API_URL https://admintuxa.ulsa.vn/wp-json/wp/v2
ENV NEXT_PUBLIC_API_RMS_URL https://admintuxa.ulsa.vn/wp-json/rankmath/v1/getHead?url=https://admintuxa.ulsa.vn
ENV NEXT_PUBLIC_DOMAIN https://dttx.ulsa.edu.vn

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/next.config.js ./ 
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

USER nextjs

EXPOSE 3006

ENV PORT 3006

CMD ["npm", "start"]
