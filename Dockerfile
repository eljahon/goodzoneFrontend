FROM node:10.16.3-alpine

RUN mkdir app
WORKDIR app


COPY package*.json ./
RUN npm install

COPY . ./
RUN npm run-script build


ENV NODE_ENV=production
ENV HOST=0.0.0.0
EXPOSE 3000
ENTRYPOINT ["npm", "start"]
