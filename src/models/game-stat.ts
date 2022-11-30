import Model from './model.js';
export class GameStat extends Model {
  static tableName = 'statistics';
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
      const { id: playerId, fullName: playerName, currentAge: playerAge, primaryNumber: playerNumber } = player.player;
      const { id: teamId, name: teamName } = player.player.currentTeam;
      const playerPosition = player.player.primaryPosition.name;
      let assists = 0, goals = 0, hits = 0, points = 0, penaltyMinutes = 0;
      const stats = player.stats;
      if(stats) {
        assists = stats.assists || 0;
        goals = stats.goals || 0;
        hits = stats.hits || 0;
        points = stats.points || 0;
        penaltyMinutes = stats.penaltyMinutes || 0;
      }
      const opponentTeam = (Object.values(player.game.teams) as any[]).find(team => team.id !== teamId).name;
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
      const existingRow = await GameStat.query().findOne({ gameId, playerId });
      const result = await (existingRow ? 
        existingRow.$query().patch(gameStat) : 
        GameStat.query().insert(gameStat)
      );
      return !!result['id'];
    }));
    return saves.every(result => !!result);
  }
};

// GET https://statsapi.web.nhl.com/api/v1/game/ID/feed/live/diffPatch?startTimecode=yyyymmdd_hhmmss 
// https://github.com/sportradarus/sportradar-advanced-challenge/blob/main/documentation.md#game-ids
// https://github.com/sportradarus/sportradar-advanced-challenge/blob/main/documentation.md#schedule