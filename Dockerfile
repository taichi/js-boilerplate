FROM node:6-alpine
MAINTAINER sato taichi <ryushi@gmail.com>

RUN apk add --update --no-cache git openssh-client tar gzip
RUN ln -s /usr/local/bin/yarn /usr/local/bin/yarnpkg
