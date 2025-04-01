# Use official Node.js image
FROM node:18

# Install Python and build essentials
RUN apt-get update && apt-get install -y python3 make g++

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Remove build tools to reduce image size (optional)
RUN apt-get remove -y python3 make g++ && apt-get autoremove -y

# Copy source code
COPY . .

# Expose the port
EXPOSE 3001

# Start the application
CMD ["node", "server.js"]