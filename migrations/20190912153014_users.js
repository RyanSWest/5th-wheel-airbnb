
exports.up = function(knex) {
  return knex.schema.createTable('messages', tbl => {
   tbl.increments();
   tbl.string('message',250).notNullable();
   tbl.integer('sender_id').notNullable();
   tbl.integer('reciever_id').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('messages')
};
