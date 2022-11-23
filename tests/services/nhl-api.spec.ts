import { schedule } from "../../src/services/nhl-api";

describe("schedule service", () => {
  it("should return an array of games", async () => {
    const games = await schedule();
    expect(games).toBeInstanceOf(Array);
  });
  it("should default to games for today", async () => {
    const games = await schedule();
    const game = games[0];
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    expect(game).toHaveProperty("gameDate");
    expect(game.gameDate).toBeInstanceOf(Date);
    expect(game.gameDate.getTime()).toBeGreaterThanOrEqual(now.getTime());
  })
  it("should return games for a specific date", async () => {
    const game = (await schedule({ date: '2018-01-09' }))[0];
    expect(game).toHaveProperty("gameDate");
    expect(game.gameDate).toBeInstanceOf(Date);
    expect(game.gameDate.getFullYear()).toBe(2018);
    expect(game.gameDate.getMonth()).toBe(0);
    expect(game.gameDate.getDate()).toBe(10);
  });
})