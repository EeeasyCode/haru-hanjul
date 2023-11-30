FROM node:14

WORKDIR /source

COPY ./package.json /source/
RUN npm install
COPY . .


CMD [ "npm", "start"]