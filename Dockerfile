FROM oven/bun:latest

# Set working directory
WORKDIR /app

# Copy files
COPY . .

# Install dependencies
RUN bun install --no-save

# Run Prisma Migrate and Generate
RUN bun x prisma migrate deploy --preview-feature
RUN bun x prisma generate

# Deploy Application Commands
RUN bun run deploy

# Run the application
CMD ["bun", "start"]