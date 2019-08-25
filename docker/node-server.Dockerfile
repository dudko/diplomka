# node server
FROM node:12.9.0-alpine
ADD ./node-server ./
RUN npm i
EXPOSE 8080
CMD ["node", "index.js"]
