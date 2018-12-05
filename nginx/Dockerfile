# nginx server
FROM nginx:alpine
COPY ./nginx/melasa-nginx.conf /etc/nginx/conf.d/melasa.conf
COPY ./nginx/melasa.cerit-sc.crt /etc/ssl/
COPY ./secrets/melasa.cerit-sc.pem /etc/ssl/
EXPOSE 80
EXPOSE 443