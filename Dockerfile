# Use the official Node.js image as the base image
FROM node:20-alpine3.17

# Set a label for the image
LABEL description="This is a test project for dockerizing a todo app with Express and Nginx"

# Set the working directory in the container
WORKDIR /app

# Install necessary packages and clean up the package cache
RUN apk add --update nginx \
    supervisor \
    && rm -f /var/cache/apk/*

# Copy the package.json and package-lock.json into the container
COPY package*.json /app

# Install Node.js dependencies
RUN npm install

# Copy Nginx configuration
COPY nginx/nginx.conf /etc/nginx/conf.d

# Copy supervisord configuration
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Copy the rest of the application files into the container
COPY . /app

# Expose the port that your application will listen on
EXPOSE 3030

# Use the entrypoint script as the command to run when the container starts
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]