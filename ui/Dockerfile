FROM node:latest
MAINTAINER "Michael Bowman<bowmanmc@gmail.com>"

WORKDIR /src
COPY . /src

RUN cd /src; npm install --silent;

CMD ["npm", "start"]

EXPOSE 9000
