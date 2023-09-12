FROM node:18-alpine

MAINTAINER mejerichanka

RUN mkdir /app
WORKDIR /app

COPY ./server/package.json /app

RUN npm i --prodaction