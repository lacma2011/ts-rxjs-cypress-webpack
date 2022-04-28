FROM node:latest

WORKDIR /usr/src
COPY . ./
RUN yarn
