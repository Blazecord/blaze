FROM node:20-slim

LABEL maintainer="ryzmd <blaze@merlbot.de>"
LABEL version="latest"

ENV NODE_ENV=production

WORKDIR /blaze

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "dist/index.js" ]
