FROM node:12.16.1

LABEL maintainer "Danang Puspito Jati <daffodil1411@gmail.com>"

ENV WORKDIR /home/workspace

WORKDIR ${WORKDIR}


COPY package.json ./

COPY swagger.json ./

COPY .env ./

COPY .env* ./

COPY src/* ./src/

RUN npm install 

#USER root

# RUN npm install --global --unsafe-perm nodemon

CMD ["npm","run","dev"]


