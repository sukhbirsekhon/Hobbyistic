FROM node:18
RUN npm install -g @angular/cli
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
COPY . /usr/src/app
EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0"]
