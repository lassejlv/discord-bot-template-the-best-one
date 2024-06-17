FROM oven/bun:latest

# Set working directory
WORKDIR /app

# Copy files
COPY . .

# Install dependencies
RUN bun install --no-save

# Deploy Application Commands
RUN bun run deploy

# Run the application
CMD ["bun", "src/main.ts"]