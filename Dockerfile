FROM node:10.16.3 as builder
RUN apt update && apt-get install -y yarn

RUN mkdir app
WORKDIR app


COPY package*.json ./
RUN yarn install

COPY . ./
RUN yarn install
RUN yarn build


FROM node:10.16.3-alpine
RUN mkdir app
WORKDIR app

COPY --from=builder /app/ /app/
ENV NODE_ENV=production
ENV HOST=0.0.0.0
EXPOSE 8081
ENTRYPOINT ["npm", "start"]
