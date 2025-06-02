import type { Knex } from 'knex';

const config: Knex.Config = {
  client: 'mysql',
  connection: {
    database: 'app',
    user: 'root',
    port: 3306,
    password: 'root',
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};

module.exports = config;
