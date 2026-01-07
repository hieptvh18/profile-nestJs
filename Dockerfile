# Stage 1: Build NestJS app (multi-stage để nhẹ)
FROM node:20-alpine AS builder

WORKDIR /app

# Copy chỉ cần thiết để cache npm
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code và build
COPY . .
RUN npm run build

# Stage 2: Production runtime (siêu nhẹ)
FROM node:20-alpine

WORKDIR /app

# Chỉ install production dependencies
COPY package.json package-lock.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy build output từ stage trước
COPY --from=builder /app/dist ./dist

# Set NODE_ENV
ENV NODE_ENV=production

# Expose port (NestJS default 3000)
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})" || exit 1

# Start application
CMD ["node", "dist/main"]

