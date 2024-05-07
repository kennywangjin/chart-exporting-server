FROM node:lts as builder
ENV NODE_ENV build
WORKDIR /app
COPY package*.json ./
RUN npm config set registry https://registry.npmmirror.com && npm install
COPY . .
RUN npm run build && npm prune --production

FROM mcr.microsoft.com/playwright:v1.44.0-jammy
ENV NODE_ENV production
EXPOSE 3000
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules/ ./node_modules/
COPY --from=builder /app/dist/ ./dist/
CMD ["node", "dist/main.js"]