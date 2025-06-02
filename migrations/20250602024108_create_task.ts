import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('tasks', (table) => {
    table.increments('id').primary();
    table.string('title', 20).notNullable();
    table.string('description', 200).notNullable();
    table.boolean('is_done').notNullable();
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('id').inTable('users');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('tasks');
}
