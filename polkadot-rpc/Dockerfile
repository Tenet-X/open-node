FROM node:15-alpine3.12

RUN mkdir /workspace
WORKDIR /workspace
COPY *.json *.js ./
RUN yarn install
CMD ["sh"]
