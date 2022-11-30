## sportradar-advanced-challenge

### Configuration/Installation
Copy, and if neccessary tweak `example-docker-compose.override.yml` to `docker-compose.override.yml`.  Docker Compose will overlay that file on top of the typical `docker-compose.yml` file. As is, it will include a redis UI, postgres ports, and debugger ports for Node.

You'll need to install Yarn dependencies.

`docker compose run --rm setup`

You'll need to scaffold a database.

`docker compose run --rm migrate`

This will use the same DB as the main app will use later.

### Running

Needs docker and docker compose. Review `docker-compose.yml` for env.

```
docker compose up
```


### Testing

`docker compose run --rm jest`

### Using

`curl http://localhost:8080` should return OK
`curl http://localhost:8080/schedule-todays-games` Should load games scheduled for today and schedule them to run
`docker compose run --rm monitor  yarn ts-node-esm src/game-worker.ts 30 2017020659` Manually watch a particular game- that's `game-worker.ts <teamid> <gameid>`


### Validation

`docker compose exec --it postgres psql -U postgres`
`select * from statistics`

Data should insert when a particular player/game is first encountered and updated on the second-Nth pass.
