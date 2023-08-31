# Development with Docker

With Docker, you can bootstrap your development environment and build images for the apps to distribute the marketplace.

First create a `.env` file with contents from the `.env.example`. No changes are required, but you can adjust the values to your needs.

## Run services in Docker

While developing locally, in most cases you would require only the MongoDB to run in the container, the rest will be started directly on your
machine with corresponding scripts. However, in some case it's desired to let the service run in the containers and start one of the 
services locally to make changes to it. For example, you may want to work on the Backend Server locally and run the Admin in the container to test changes.
The problem we are facing here, the Nuxt server, powering the admin app, will try to access the backend inside the container on the Docker Compose 
network, what obviously can not work.

This means it is necessary to configure the deployment so that the services can communicate with each other, regardless 
of whether they are running locally or in the container. On the Linux it can be easily done with environment variables.
In your `.env` add the following variables:

```dotenv
API_PORT=3000 # port where the Backend Server is running
DOCKER_GATEWAY_HOST=172.17.0.1 # specific to linux. If you left this variable out, "host.docker.internal" will be set as default host value, usefull for other plattforms
```
Now it's done! You can start the required service:

```bash
# docker-compose.yml gets automatically overwritten by docker-compose.override.yml where all the magic is already configured to work 
docker-compose up -d admin
# or docker compose up -d admin if your are using the latest version
```

> ⚠️ For "production" like environments use the `docker-compose.prod.yml`. This file is configured for all service to work only inside the Docker network, without any magic
> ```bash
> docker-compose -f docker-compose.prod.yml up -d
>```

## Build and push images

Build the images is easy as:

```bash
docker-compose build <service_name>
# for example
docker-compose build admin
```

By default, the images can be pushed to GitLab registry:

```bash
docker-compose push <service_name>
# for example
docker-compose push admin
```

> ⚠️ You have to log in to docker registry with you credentials
