# Use the official Node.js image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Build the frontend
RUN npm run build

# Expose the preview port
EXPOSE 4173

# Command to serve the built app
CMD ["npm", "run", "preview"]
