# build
FROM node:latest as react-app
ADD ./react-app ./

ARG REACT_APP_SUBSCRIBERS_DB
ENV REACT_APP_SUBSCRIBERS_DB=$REACT_APP_SUBSCRIBERS_DB
ARG REACT_APP_MATERIAL_PROJECT_API
ENV REACT_APP_MATERIAL_PROJECT_API=$REACT_APP_MATERIAL_PROJECT_API

RUN npm i
RUN npm run build

# nginx server
FROM nginx:alpine
COPY --from=react-app /build /usr/share/nginx/html
COPY ./nginx/melasa-nginx.conf /etc/nginx/conf.d/melasa.conf
COPY ./nginx/melasa.cerit-sc.crt /etc/ssl/
COPY ./secrets/melasa.cerit-sc.pem /etc/ssl/
EXPOSE 80
EXPOSE 443