# node server
FROM node:latest
ADD ./node-server ./
RUN npm i
EXPOSE 8080
CMD ["node", "index.js"]
