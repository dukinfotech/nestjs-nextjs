FROM nginx:stable-alpine3.17

COPY ./default.conf /etc/nginx/conf.d/default.conf

RUN nginx -c /etc/nginx/nginx.conf -t