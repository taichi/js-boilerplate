FROM node:6-alpine
MAINTAINER sato taichi <ryushi@gmail.com>

RUN apk add --update --no-cache git openssh-client tar gzip
RUN rm /usr/local/bin/yarn && npm install --global yarn@0.23.1
