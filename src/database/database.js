import {Sequelize} from 'sequelize';
import env from '../config/env.js';

export const sequelize = new Sequelize(
  env.db_database,
  env.db_user,
  env.db_password,
  {
    host: env.db_host || 'localhost',
    port: env.db_port || 5432,
    dialect: env.db_dialect || 'postgres',
    logging: console.log
  }
);