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
    })
    .createTable('photos', tbl => {
      tbl.increments();
      tbl
        .integer('property_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('properties')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.string('imageUrl').notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('photos')
    .dropTableIfExists('properties')
    .dropTableIfExists('users');
};
