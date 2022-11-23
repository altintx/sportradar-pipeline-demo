import ky from 'ky';
import { flatten } from 'array-flatten';

export type Schedule = any;
export type ScheduleOptions = {
  season?: string;
  startDate?: string;
  endDate?: string;
  teamId?: string;
  date?: string;
} | false;
export async function schedule(options: ScheduleOptions = false): Promise<Schedule[]>  {
  // https://github.com/sportradarus/sportradar-advanced-challenge/blob/main/documentation.md#schedule
  const url = 'https://statsapi.web.nhl.com/api/v1/schedule' + (options ? '?' + new URLSearchParams(options) : '');
  const data = await ky.get(url).json() as any;
  return flatten(data.dates.map(({ games }) => games.map(g => enrichDates(g))));
}

function enrichDates(record): Schedule {
  return Object.assign({}, record, {
    gameDate: new Date(record.gameDate)
  })
}
