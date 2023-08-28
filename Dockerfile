FROM node:20-alpine

# COPY --from=library/docker:latest /usr/local/bin/docker /usr/bin/docker
COPY --from=docker/compose:latest /usr/local/bin/docker-compose /usr/bin/docker-compose

# COPY ./server-side/package.json /app/package.json
# COPY ./server-side/package-lock.json /app/package-lock.json
ADD ./server-side/ /app/server-side/

WORKDIR /app/server-side

RUN npm install
ENV DOCKER_UI_YAML_PATH /opt/docker-projects

VOLUME /app
VOLUME ["/opt/docker-projects"]

ENV DOCKER_HOST=unix:///var/run/docker.sock
COPY docker-projects /opt/docker-projects

CMD []
WORKDIR /app/server-side
ENTRYPOINT npm start --prefix /app/server-side

WORKDIR /opt/docker-projects/
