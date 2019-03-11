FROM node:8

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run heroku-postbuild

EXPOSE 8000

ENV NODE_ENV=docker

CMD ["sh", "-c", "cd dist && node index.js"]