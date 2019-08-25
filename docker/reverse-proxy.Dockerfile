# nginx server
FROM nginx:1.13-alpine
COPY ./react-app/build /usr/share/nginx/html
COPY ./docker/melasa-nginx.conf /etc/nginx/conf.d/default.conf
COPY ./docker/melasa.cerit-sc.crt /etc/ssl/
COPY ./secrets/melasa.cerit-sc.pem /etc/ssl/
EXPOSE 80
EXPOSE 443
