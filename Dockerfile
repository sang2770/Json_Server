### STAGE 1: Build ###
FROM node:16
# Set the current working directory inside the image
WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm start
