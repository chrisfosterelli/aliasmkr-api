FROM node:6

EXPOSE 8080

WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
RUN npm run build

CMD ["npm", "start"]
