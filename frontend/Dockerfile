FROM node:18-alpine

WORKDIR /usr/src/app
# Copy all files and folders from current context (set in the docker-compose file) to WORKINGDIR
COPY ./frontend .
# Copy .env file from current context to WORKINGDIR and rename it to .env.local
COPY ./.env ./.env.local
# Get APP_ENV, APP_URL, APP_SECRET args from docker-compose file
ARG APP_ENV
ARG APP_URL
ARG APP_SECRET
# Set NODE_ENV for hiding stack traces in production
ENV NODE_ENV=${APP_ENV}
# Set NEXTAUTH_URL and NEXTAUTH_SECRET
ENV NEXTAUTH_URL=${APP_URL}
ENV NEXTAUTH_SECRET=${APP_SECRET}
# Install dependencies
RUN if [ "${APP_ENV}" = "development" ]; then \
        npm install --only=development; \
    else \
        npm install --omit=dev; \
    fi
# Run the build command which generates an optimized version of nextjs application for production
RUN if [ "${APP_ENV}" = "production" ]; then \
        npm run build; \
    fi

RUN echo "<========== Enviroment: ${APP_ENV} ==========>"