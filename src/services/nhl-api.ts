import { flatten } from 'array-flatten';
import ky from 'ky-universal';

export type Schedule = any;
export type Game = any;
export type ScheduleOptions = {
  season?: string;
  startDate?: string;
  endDate?: string;
  teamId?: string;
  date?: string;
} | false;
type GameIdMeta = {
  season: string;
  type: string;
  index: string;
}
export async function schedule(options: ScheduleOptions = false): Promise<Schedule[]>  {
  // https://github.com/sportradarus/sportradar-advanced-challenge/blob/main/documentation.md#schedule
  // const { default: ky } = await import('ky');
  const url = 'https://statsapi.web.nhl.com/api/v1/schedule' + (options ? '?' + new URLSearchParams(options) : '');
  const data = await ky.get(url).json() as any;
  return flatten(data.dates.map(({ games }) => games.map(g => enrichDates(g))));
}

export async function gameByPk(teamId: string, pk: number): Promise<Game> {
  const gameId = decodeGamePk(String(pk));
  console.log(gameId);
  const games = await schedule({
    teamId,
    season: gameId.season
  });
  return games.find(g => g.gamePk === pk);
}

export async function getLiveGameStats(gameId: string, lastPollCode: string): Promise<any> {
  // const { default: ky } = await import('ky');
  const url = `https://statsapi.web.nhl.com/api/v1/game/${gameId}/feed/live/diffPatch${lastPollCode? `?startTimecode=${lastPollCode}`: ''}`;
  const data = await ky.get(url).json() as any;
  data.gameData.status.statusCode = parseInt(data.gameData.status.statusCode);
  return data.gameData;
}

export function getGameBoxScores(gameId: string): Promise<any> {
  const url = `https://statsapi.web.nhl.com/api/v1/game/${gameId}/boxscore`;
  return ky.get(url).json();
}

function enrichDates(record): Schedule {
  return Object.assign({}, record, {
    gameDate: new Date(record.gameDate)
  })
}

function decodeGamePk(pk: string): GameIdMeta {
  const season = parseInt(pk.slice(0, 4));
  const type = pk.slice(4, 6);
  const index = pk.slice(6, 8);
  return {
    type,
    index,
    season: `${season}${season + 1}`
  }

}