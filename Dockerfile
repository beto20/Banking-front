FROM node:16.14.0
WORKDIR /usr/src/app
COPY src/ ./app/
RUN cd app && npm install @angular/cli && npm install && npm run build

FROM nginx:alpine

#!/bin/sh
COPY /nginx-custom.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY /dist/banking-alfa-front/ /usr/share/nginx/html

EXPOSE 4200 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]