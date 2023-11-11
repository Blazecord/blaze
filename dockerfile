FROM node:20-slim

LABEL maintainer="ryzmd <blaze@merlbot.de>"
LABEL version="latest"

ENV NODE_ENV=production

WORKDIR /blaze

COPY package.json .
COPY package-lock.json .

COPY . .

RUN npm install

EXPOSE 4000 

RUN npm run build

CMD [ "node", "dist/index.js" ]
