import Model from './model.js';
export class GameStat extends Model {
  // playerId: string;
  // playerName: string;
  // teamId: string;
  // teamName: string;
  // playerAge: string;
  // playerNumber: string;
  // playerPosition: string;
  // assists: number = 0;
  // goals: number = 0;
  // hits: number = 0;
  // points: number = 0;
  // penaltyMinutes: number = 0;
  // opponentTeam: string;

  static async capture(gameId: string, status: any) {
    console.log("write stats data to DB")
  }
};

// GET https://statsapi.web.nhl.com/api/v1/game/ID/feed/live/diffPatch?startTimecode=yyyymmdd_hhmmss 
// https://github.com/sportradarus/sportradar-advanced-challenge/blob/main/documentation.md#game-ids
// https://github.com/sportradarus/sportradar-advanced-challenge/blob/main/documentation.md#schedule