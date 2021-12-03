FROM node:16-alpine

WORKDIR /app
COPY package.json .
RUN yarn install --production
COPY . .

CMD [ "yarn", "start" ]