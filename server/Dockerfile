FROM node:14-alpine

WORKDIR /app

COPY package.json .

COPY yarn.lock .

COPY . .

RUN yarn tsc

CMD ["yarn", "start"]
