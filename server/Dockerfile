FROM node:14

WORKDIR /source

COPY ./package.json /source/
RUN npm install
COPY . .

RUN ["chmod", "+x", "docker-entrypoint.sh"]
ENTRYPOINT ["sh", "docker-entrypoint.sh"]

CMD [ "npm", "start"]