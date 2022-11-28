import { Model } from 'objection';
import { connection } from '../services/knex.js';
Model.knex(connection);
export default Model;