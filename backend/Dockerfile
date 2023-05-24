FROM node:18-alpine

WORKDIR /usr/src/app
# Copy all files and folders from current context (set in the docker-compose file) to WORKINGDIR
COPY . .
# Get APP_ENV arg from docker-compose file
ARG APP_ENV
# Install dependencies
RUN if [ "${APP_ENV}" = "development" ]; then \
        npm install --only=development; \
    else \
        npm install --omit=dev; \
    fi
# Read Prisma schema and updates the generated Prisma Client library inside node_modules/@prisma/client
# Generate object types, inputs, args,...(need to exclude prisma-nestjs-graphql package from devDependencies)
RUN npx prisma generate
# Run the build command which creates the production bundle (need to exclude @nestjs/cli package from devDependencies)
RUN if [ "${APP_ENV}" = "production" ]; then \
        npm run build; \
    fi

RUN echo "<========== Enviroment: ${APP_ENV} ==========>"