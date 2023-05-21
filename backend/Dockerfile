###################
# BUILD FOR LOCAL DEVELOPMENT
###################
FROM node:18-alpine As development
# Set context
WORKDIR /usr/src/app
# Copy the package.json and package-lock.json file in the current context
COPY package*.json ./
# Install the dev dependencies
RUN npm install --only=development

COPY . .

###################
# BUILD FOR PRODUCTION
###################
FROM node:18-alpine As production

ARG NODE_ENV=production
# Set process.env.NODE_ENV=production in nestjs application
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
# Omit dev dependencies from the install
RUN npm install --omit=dev

COPY . .
# Run the build command which creates the production bundle
RUN npm run build
# Use the node user from the image (instead of the root user)
CMD ["node", "dist/main"]