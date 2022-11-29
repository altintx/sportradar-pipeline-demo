// take a gameID on command line
// look up its scheduledTime
// wait until now >= scheduledTime to start polling
// when polling returns end of game, stop polling and exit

import { GameStat } from "./models/game-stat.js";
import { gameByPk, getGameBoxScores, getLiveGameStats } from "./services/nhl-api.js";
import * as url from 'node:url';

const STATUS_COMPLETE = 7;

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
  lastPoll = scheduledTime;
  while(now >= scheduledTime) {
    console.log("looping");
    const game = await getLiveGameStats(gameId, lastPoll);
    const box = await getGameBoxScores(gameId);
    lastPoll = game.time; // todo: expecting there to be a timestamp in the response

    const playerGameStats = Object.values(box.teams.home.players)
      .map((player: any) => ({ 
        player: player.person, 
        stats: player.stats.skaterStats,
        game: game
      }));
    // console.log(playerGameStats[0]);

    GameStat.capture(gameId, playerGameStats);

    if(game.status.statusCode === STATUS_COMPLETE) {
      console.log("Game is over");
      return 0;
    } else {
      console.log("Game is not over. Waiting 10 seconds");
      await new Promise(resolve => setTimeout(resolve, 10000));
      // run again
    }
  }
}

if (import.meta.url.startsWith('file:')) { // (A)
  const modulePath = url.fileURLToPath(import.meta.url);
  if (process.argv[1] === modulePath) { // (B)
    if (process.argv.length < 4) {
      console.log('Usage: ts-node-esm game-worker.ts <team> <gameId>');
      process.exit(1);
    }
    const team = process.argv[2];
    const gameId = parseInt(process.argv[3]);
    worker(team, gameId).then(exitCode => process.exit(exitCode));
  
  }
}