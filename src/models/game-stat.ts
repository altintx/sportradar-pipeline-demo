import Model from './model.js';
export class GameStat extends Model {
  // these are in status[].player
  // playerId: string;
  // playerName: string;
  // teamId: string;
  // teamName: string;
  // playerAge: string;
  // playerNumber: string;
  // playerPosition: string;

  // these are in status[].stats
  // assists: number = 0;
  // goals: number = 0;
  // hits: number = 0;
  // points: number = 0;
  // penaltyMinutes: number = 0;

  // this is derived from the game data status[].game.teams
  // opponentTeam: string;
  
  static async capture(gameId: string, status: any[]) {
    const saves = await Promise.all(status.map(async player => {
      const { playerId, playerName, teamId, teamName, playerAge, playerNumber, playerPosition } = player.player;
      const { assists, goals, hits, points, penaltyMinutes } = player.stats;
      const opponentTeam = player.game.teams.find(team => team.team.id !== teamId).team.name;
      const gameStat = {
        gameId,
        playerId,
        playerName,
        teamId,
        teamName,
        playerAge,
        playerNumber,
        playerPosition,
        assists,
        goals,
        hits,
        points,
        penaltyMinutes,
        opponentTeam
      };
      const result = await GameStat.query().insert(gameStat).debug();
      return !!result.id;
    }));
    return saves.some(result => !result) ? false: true;
  }
};

// GET https://statsapi.web.nhl.com/api/v1/game/ID/feed/live/diffPatch?startTimecode=yyyymmdd_hhmmss 
// https://github.com/sportradarus/sportradar-advanced-challenge/blob/main/documentation.md#game-ids
// https://github.com/sportradarus/sportradar-advanced-challenge/blob/main/documentation.md#schedule