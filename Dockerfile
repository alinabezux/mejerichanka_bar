FROM node:18-alpine

MAINTAINER mejerichanka

RUN mkdir /server
WORKDIR /server

COPY ./server/package.json /server

RUN npm i --production
