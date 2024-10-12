# Docker-UI
The final report can be found in the [docs folder](./docs/report.pdf).
# Features
A web interface meant to allow the management of Docker containers through the 
docker-compose API from a web interface. Some of the features include:
- Build and create Docker containers from simple Docker Compose files.
- Real-time visualization of the logging information being produced inside a container.
- The ability to create, launch and stop docker containers from the Web UI.
- Authentication and registration functionality to create new users.
- Deployment of the image on [Docker Hub](https://hub.docker.com/r/razvanfv/docker-ui).

# Installation Instructions
## Installation dependencies
Please make sure to install the following dependencies:
1. Install mongodb
2. Install docker
3. Install docker-compose

# Running instructions
Launch the docker daemon then clone and launch the application.

```
> sudo systemctl start docker
> git clone https://github.com/raz-m12/docker-ui/
> cd docker-ui
> sudo ./run-local
```


## Figma User Interface Design
The designed user interface can be found on the [Figma website](https://www.figma.com/design/TGgkRNt5faxYmILkp60JdN/Docker-UI).

