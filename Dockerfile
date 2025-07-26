# Build stage
FROM node:20-alpine AS build

# Add metadata
LABEL maintainer="Gergely Szabo"
LABEL version="1.0"
LABEL description="Basic Todo App"

WORKDIR /app

COPY package*.json ./
# Add these debug steps

RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Add non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup && \
    npm install -g serve && \
    chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

COPY --from=build /app/build ./build

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
