# Use official Node.js image
FROM node:20

# Set work directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Expose port
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
