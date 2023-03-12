FROM node as build-stage
WORKDIR /src/app
COPY . ./
RUN npm install 
RUN npm run build --omit=dev
FROM nginx as production-stage
COPY --from=build-stage /src/app/dist /usr/share/nginx/html
COPY ./certs/hobbyistics.com.pem /etc/nginx/certs/cert.crt
COPY ./certs/hobbyistics.com.key /etc/nginx/certs/cert.key
COPY nginx.conf /etc/nginx/nginx.conf