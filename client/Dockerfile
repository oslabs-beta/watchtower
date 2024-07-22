# Use an official Node.js runtime as a parent image
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

# Use a lightweight web server to serve the built app
FROM nginx:alpine
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html

# Expose the port the app runs on
EXPOSE 3000

# Start the server
CMD ["nginx", "-g", "daemon off;"]
