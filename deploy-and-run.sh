#!/bin/bash

systemctl stop mongodb
# Uncomment if not logged in (launching for the first time)
# docker login -u razfv07@gmail.com

docker build -t docker-ui-server server-side/
docker tag docker-ui-server:latest razvanfv/docker-ui:server
docker push razvanfv/docker-ui:server

docker build -t docker-ui-client client-side/
docker tag docker-ui-client:latest razvanfv/docker-ui:client
docker push razvanfv/docker-ui:client

docker-compose --file docker-compose-remote.yml up
