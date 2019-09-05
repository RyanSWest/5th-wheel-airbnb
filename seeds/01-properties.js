
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('properties').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('properties').insert([
        {location: 'Miami', price:200, description: 'By the Beach' },
        {location: 'Denver', price: 90, description: 'Downtown Denver'},
        {location: 'Portland', price: 75, description: 'downtown Portland'}
      ]);
    });
};
