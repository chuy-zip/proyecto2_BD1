FROM node:latest

WORKDIR /vite-project

COPY package*.json ./

RUN npm install

RUN npm install express  

RUN npm install pg

RUN npm install cors

RUN npm install crypto-js

COPY ./src ./src

CMD ["npm", "start"]