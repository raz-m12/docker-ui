#!/bin/bash

systemctl stop mongodb

rm -rf server-side/node_modules
rm -rf client-side/node_modules
docker build -t docker-ui-server server-side/
docker tag docker-ui-server:latest razvanfv/docker-ui:server
docker push razvanfv/docker-ui:server

docker build -t docker-ui-client client-side/
docker tag docker-ui-client:latest razvanfv/docker-ui:client
docker push razvanfv/docker-ui:client

docker-compose --file docker-compose-remote.yml up
