exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('rentals')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('rentals').insert([
        {
          id: 1,
          renter_id: 1,
          property_id: 1,
          start_date: '2019-09-10',
          end_date: '2019-09-17'
        },
        {
          id: 2,
          renter_id: 3,
          property_id: 2,
          start_date: '2019-09-13',
          end_date: '2019-09-19'
        },
        {
          id: 3,
          renter_id: 3,
          property_id: 3,
          start_date: '2019-09-14',
          end_date: '2019-09-22'
        }
      ]);
    });
};
