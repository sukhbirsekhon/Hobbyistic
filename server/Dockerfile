FROM node:18
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
# RUN npm ci --only=production
RUN npm install --force
COPY . /usr/src/app
EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "app.js"]