###################
# BUILD FOR LOCAL DEVELOPMENT
###################
FROM node:18-alpine As development

WORKDIR /usr/src/app
# Copy all files and folders from current context (set in the docker-compose file) to WORKINGDIR
COPY . .
# Install the dev dependencies
RUN npm install --only=development

###################
# BUILD FOR PRODUCTION
###################
FROM node:18-alpine As production

WORKDIR /usr/src/app
# Copy all files and folders from current context (set in the docker-compose file) to WORKINGDIR
COPY . .
# Omit dev dependencies from the install
RUN npm install --omit=dev
# Read Prisma schema and updates the generated Prisma Client library inside node_modules/@prisma/client
RUN npx prisma generate
# Run the build command which creates the production bundle (need to exclude @nestjs/cli package from devDependencies)
RUN npm run build
# Run app
CMD ["node", "dist/main"]