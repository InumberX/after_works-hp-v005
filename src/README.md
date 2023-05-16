# After Works.

## Development with Docker

Start a shell such as PoworShell and navigate to the root of the project.

### Launching Containers

The container is started by executing the following command.

```shell
docker compose up -d
```

### Frontend

#### Installing packages

Install the Node.js package.

```shell
docker compose exec frontend yarn install
```

#### Execution of development tasks

Execute the following command.

```shell
docker compose exec frontend yarn dev
```

The following URL will take you to the screen.

http://localhost:3000/

- Press "Ctrl + C" to stop

### Backend

#### Installing packages

Install the Node.js package.

```shell
docker compose exec backend yarn install
```

#### Execution of development tasks

Execute the following command.

```shell
docker compose exec backend yarn develop
```

The following URL will take you to the screen.

http://localhost:1337/

- Press "Ctrl + C" to stop

### Stopping Containers

Execute the following command to stop the container.

```shell
docker compose down
```
