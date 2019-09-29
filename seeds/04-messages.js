exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('messages')
    .del()
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
