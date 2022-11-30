/* eslint-disable camelcase */

exports.shorthands = undefined;

const t_string = {
  type: "varchar(255)",
  notNull: true
};

const t_int = {
  type: 'integer',
  notNull: true
};

exports.up = pgm => {
  pgm.createTable('statistics', {
    id: 'id',
    gameId: t_string,
    playerId: t_string,
    playerName: t_string,
    teamId: t_string,
    teamName: t_string,
    playerAge: t_int,
    playerNumber: t_string,
    playerPosition: t_string,
    assists: t_int,
    goals: t_int,
    hits: t_int,
    points: t_int,
    penaltyMinutes: t_int,
    opponentTeam: t_string,
  })
};

exports.down = pgm => {
  pgm.dropTable('statistics')
};
