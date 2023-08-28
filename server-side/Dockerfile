FROM node:20-alpine

# COPY --from=library/docker:latest /usr/local/bin/docker /usr/bin/docker
COPY --from=docker/compose:latest /usr/local/bin/docker-compose /usr/bin/docker-compose

# COPY ./server-side/package.json /app/package.json
# COPY ./server-side/package-lock.json /app/package-lock.json
ADD . /app/server-side/

WORKDIR /app/server-side

RUN npm install

VOLUME /app
VOLUME ["/opt/docker-projects"]

# Environment variables. Corresponding to the variable in server-side Dockerfile
ENV SERVER_ENDPOINT 0.0.0.0:3000
ENV DOCKER_HOST=unix:///var/run/docker.sock
ENV DOCKER_UI_YAML_PATH /opt/docker-projects

COPY docker-projects /opt/docker-projects

CMD []
WORKDIR /app/server-side

ENTRYPOINT npm start --prefix /app/server-side
# ENTRYPOINT nodemon npm start --prefix /app/server-side
# CMD["npm", "start", "--prefix", "/app/server-side"]

EXPOSE 3000

WORKDIR /opt/docker-projects/
