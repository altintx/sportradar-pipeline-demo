// take a gameID on command line
// look up its scheduledTime
// wait until now >= scheduledTime to start polling
// when polling returns end of game, stop polling and exit

import { GameStat } from "./models/game-stat.js";
import { gameByPk, getLiveGameStats } from "./services/nhl-api.js";
import * as url from 'node:url';

export async function worker(teamId, gameId) {
  const game = await gameByPk(teamId, gameId);
  console.log(game);
  const scheduledTime = game.gameDate.getTime();
  let now = new Date().getTime();
  let lastPoll: string = null;
  if(now < scheduledTime) {
    console.log(`Waiting until ${new Date(scheduledTime)} to start polling`);
    await new Promise(resolve => setTimeout(resolve, scheduledTime - now));
    now = scheduledTime
  }
  while(now >= scheduledTime) {
    const status = await getLiveGameStats(gameId, lastPoll);
    lastPoll = status.time; // todo: expecting there to be a timestamp in the response

    GameStat.capture(gameId, status);

    if(status.gameStatus === 'final') {
      return 0;
    } else {
      await new Promise(resolve => setTimeout(resolve, 100000));
      // run again
    }
  }
}

if (import.meta.url.startsWith('file:')) { // (A)
  const modulePath = url.fileURLToPath(import.meta.url);
  if (process.argv[1] === modulePath) { // (B)
    if (process.argv.length < 4) {
      console.log('Usage: node game-worker.js <team> <gameId>');
      process.exit(1);
    }
    const team = process.argv[2];
    const gameId = parseInt(process.argv[3]);
    worker(team, gameId).then(exitCode => process.exit(exitCode));
  
  }
}