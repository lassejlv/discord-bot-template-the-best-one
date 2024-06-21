FROM oven/bun:latest

# Set working directory
WORKDIR /app

# Copy files
COPY . .

# Install dependencies
RUN bun install --no-save

# Prisma Generate
RUN bunx prisma generate --no-engine

# Deploy Application Commands
RUN bun run deploy

# Run the application
CMD ["bun", "src/main.ts"]