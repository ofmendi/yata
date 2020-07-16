FROM node:10.23.1-alpine AS build-env
WORKDIR /app
COPY . .
RUN yarn install --production && yarn react-scripts build

FROM nginx:1.14.0
WORKDIR /app
COPY --from=build-env /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
