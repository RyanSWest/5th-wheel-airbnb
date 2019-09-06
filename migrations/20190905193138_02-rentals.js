exports.up = function(knex, Promise) {
  return knex.schema.createTable('rentals', tbl => {
    tbl.increments();
    tbl
      .integer('renter_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .integer('property_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('properties')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.date('start_date').notNullable();
    tbl.date('end_date').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('rentals');
};
