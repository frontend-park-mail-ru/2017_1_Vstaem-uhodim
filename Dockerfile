FROM nginx:1.13.0-alpine

RUN apk add --update bash

RUN mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.backup
COPY ./nginx.conf /etc/nginx/conf.d/
COPY ./listen.conf /etc/nginx/

RUN mkdir /static
COPY ./static/index.html /static/index.html
COPY ./static/build_main.js /static/build_main.js
COPY ./static/manifest.json /static/manifest.json
COPY ./static/service_worker.js /static/service_worker.js
COPY ./static/fonts /static/fonts
COPY ./static/imgs /static/imgs

CMD /bin/bash -c "echo \"listen $PORT;\" > /etc/nginx/listen.conf && nginx -g 'daemon off;'"


