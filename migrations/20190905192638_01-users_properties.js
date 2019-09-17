exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
      tbl.increments();
      tbl
        .string('username', 128)
        .notNullable()
        .unique();
      tbl.string('password', 128).notNullable();
      tbl.string('user_type', 128).notNullable();
<<<<<<< HEAD
      tbl.string('messages', 240)
=======
      tbl.string('messages', 240);
>>>>>>> 5dbc022396d6174b9b0bf39a62f671f3cb376276
    })
    .createTable('properties', tbl => {
      tbl.increments();
      tbl.string('location', 128).notNullable();
      tbl.string('description', 200);
      tbl.integer('price').notNullable();
      tbl
        .integer('owner_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('properties').dropTableIfExists('users');
};
