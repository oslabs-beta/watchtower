# Build stage
FROM node:16 AS build-stage

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app for production
RUN npm run build

# Production stage
FROM node:16-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy the build output from the build stage
COPY --from=build-stage /usr/src/app/build /usr/src/app/build

# Copy the rest of the application code
COPY . .

# Install serve to serve the built application
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 5000

# Start the application
CMD ["serve", "-s", "build", "-l", "5000"]
