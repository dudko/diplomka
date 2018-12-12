# nginx server
FROM nginx:alpine
COPY ./react-app/build /usr/share/nginx/html
COPY ./nginx-reverse/melasa-nginx.conf /etc/nginx/conf.d/melasa.conf
COPY ./nginx-reverse/melasa.cerit-sc.crt /etc/ssl/
COPY ./secrets/melasa.cerit-sc.pem /etc/ssl/
EXPOSE 80
EXPOSE 443
