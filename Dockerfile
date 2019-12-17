FROM node:12.13.1

WORKDIR /usr/src/app

COPY . .

RUN npm install yarn
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

RUN yarn build

EXPOSE 5000
CMD [ "yarn", "start-prod" ]