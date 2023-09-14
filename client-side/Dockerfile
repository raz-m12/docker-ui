# Create image based off of the official 12.8-alpine
FROM node:18.17.1-alpine3.18

#RUN echo "nameserver 8.8.8.8" |  tee /etc/resolv.conf > /dev/null
WORKDIR /app/client-side

# Copy dependency definitions
COPY package*.json ./
COPY . /app/client-side

## installing and Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i --legacy-peer-deps
RUN npm install -g @angular/cli
RUN npm install


# Ports exposed by this container
EXPOSE 4200

# Environment variables. Corresponding to the variable in server-side Dockerfile
ENV SERVER_ENDPOINT 0.0.0.0:3000

CMD [ "ng", "serve", "--configuration=docker" ]
