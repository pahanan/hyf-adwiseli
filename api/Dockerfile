FROM node:22
WORKDIR /app
ENV OPENSSL_CONF=/dev/null
COPY package.json .
COPY . .
RUN npm install --platform=linux --arch=x64
RUN npm run build
EXPOSE 8080
CMD ["npm", "start"]