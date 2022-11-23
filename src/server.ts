import * as express from 'express';
import { schedule } from './services/nhl-api';

const app = express();
const PORT = 8080;


// should have a prompt for a game id which will spawn a worker during that game
// the worker will query API for realtime data and write to my DB

// should also query for all 

//  You'll need to monitor the schedule feed and when a game starts, or goes live, a corresponding job will activate and ingest the live data into a database. 

// there's not much going on here
// high level "is it working"
// maybe some general reporting later
// maybe we know how many workers are running?

app.get('/', (req, res) => {
  res.send("ok")
});

app.get('/schedule-todays-games', async (req, res) => {
  (await schedule()).forEach(game => {
    // if game.game.gameDate >= now
      // schedule work
  })
  
})

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}/`);
});