# Use Node.js 20 slim image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including devDependencies for build)
RUN npm install

# Copy all source code
COPY . .

# Build the application
RUN npm run build

# Expose port (Fly.io will use PORT env variable)
EXPOSE 8080

# Start the application
CMD ["npm", "start"]
