# ==========================================
# Stage 1 - Builder
# ==========================================
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


# ==========================================
# Stage 2 - Production
# ==========================================
FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy package files
COPY package*.json ./

# Chỉ cài production dependencies
RUN npm ci --omit=dev

# Copy Prisma schema từ Builder sang
COPY --from=builder /app/prisma ./prisma

# Generate lại Prisma Client chuẩn cho môi trường Production
RUN npx prisma generate

# Copy code đã compiled từ Builder
COPY --from=builder /app/dist ./dist

# Đổi quyền sở hữu thư mục cho user 'node' (không dùng root)
USER node

EXPOSE 3000

# Chạy trực tiếp bằng node để hỗ trợ Graceful Shutdown
CMD ["node", "dist/src/main"]
