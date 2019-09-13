
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('table_name').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {message: 'Hello Guy'},
        {sender_id: 1},
        {reciever_id:3}
      ]);
    });
};
