FROM node:12.13.1

WORKDIR /usr/src/app

COPY package*.json ./
COPY public ./public
COPY src ./src

RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
RUN npm install yarn

RUN npm run build

COPY . .

EXPOSE 5000
CMD [ "yarn", "start-prod" ]