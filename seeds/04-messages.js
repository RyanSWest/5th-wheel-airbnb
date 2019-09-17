exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('messages')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('messages').insert([
        {
          id: 1,
          message: 'Hello Guy',
          sender_id: 1,
          reciever_id: 3
        }
      ]);
    });
};
