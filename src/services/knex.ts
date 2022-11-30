import * as knexPkg from 'knex';
const { knex } = knexPkg.default;
if(!(process.env.DATABASE_URL)) {
  throw new Error('DATABASE_URL environment variable is not set');
}
const DATABASE_URL = process.env.DATABASE_URL;
console.log("DATABASE_URI", DATABASE_URL);
export const connection = knex({
  client: 'pg',
  connection: DATABASE_URL
});
