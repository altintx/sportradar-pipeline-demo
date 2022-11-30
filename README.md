## sportradar-advanced-challenge

### Configuration/Installation
Copy, and if neccessary tweak `example-docker-compose.override.yml` to `docker-compose.override.yml`.  Docker Compose will overlay that file on top of the typical `docker-compose.yml` file. As is, it will include a redis UI, postgres ports, and debugger ports for Node.

You'll need to scaffold a database.

`docker compose run --rm migrate`

This will use the same DB as the 

### Running

Needs docker and docker compose. Review `docker-compose.yml` for env.

```
docker compose up
```


### Testing

`docker compose run --rm jest`

### Using

http://localhost:8080  Status of the main monitor process

`docker compose run --rm monitor  yarn ts-node-esm src/game-worker.ts 30 2017020659` Watch a particular game- that's `game-worker.ts <teamid> <gameid>`
