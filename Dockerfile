# ── Stage 1: build React app ──────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ── Stage 2: serve with nginx (unprivileged: runs as uid 101, listens on 8080) ─
FROM nginxinc/nginx-unprivileged:1.27-alpine AS runner
# Patch OS packages (openssl/libcrypto et al.) to clear fixable CVEs
USER root
RUN apk --no-cache upgrade
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
USER 101
EXPOSE 8080
