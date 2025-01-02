FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Clean install dependencies
RUN rm -rf node_modules
RUN npm cache clean --force
RUN npm install

# Copy rest of the app
COPY . .

EXPOSE 3000
CMD ["npm", "start"] 