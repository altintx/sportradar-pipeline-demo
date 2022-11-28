import * as knexPkg from 'knex';
const { knex } = knexPkg.default;
if(!(process.env.DATABASE_URL)) {
  throw new Error('DATABASE_URL environment variable is not set');
}
const DATABASE_URI = process.env.DATABASE_URI;
export const connection = knex({
  client: 'pg',
  connection: DATABASE_URI
});
