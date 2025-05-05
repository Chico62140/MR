# Use Node for building the app
FROM node:18

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Build the app
RUN npm run build

# Serve the app with 'serve'
RUN npm install -g serve
CMD ["serve", "-s", "build"]

EXPOSE 3000
