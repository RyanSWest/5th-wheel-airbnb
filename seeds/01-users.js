exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          username: 'Jeremy',
          password: 'password',
          user_type: 'rv-owner'
        },
        {
          id: 2,
          username: 'Ryan',
          password: 'password',
          user_type: 'land-owner'
        },
        {
          id: 3,
          username: 'Delilah',
          password: 'password',
          user_type: 'rv-owner'
        },
        {
          id: 4,
          username: 'Sampson',
          password: 'password',
          user_type: 'land-owner'
        }
      ]);
    });
};
