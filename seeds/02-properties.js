exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('properties')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('properties').insert([
        {
          id: 1,
          location: 'Miami',
          price: 200,
          description: 'By the Beach',
          owner_id: 2
        },
        {
          id: 2,
          location: 'Denver',
          price: 90,
          description: 'Downtown Denver',
          owner_id: 2
        },
        {
          id: 3,
          location: 'Portland',
          price: 75,
          description: 'downtown Portland',
          owner_id: 4
        }
      ]);
    });
};
