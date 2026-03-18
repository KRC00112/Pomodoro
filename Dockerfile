FROM node:25-alpine3.22 AS build_stage

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.27.0

RUN rm -rf /usr/share/nginx/html

COPY --from=build_stage app/dist /usr/share/nginx/html
