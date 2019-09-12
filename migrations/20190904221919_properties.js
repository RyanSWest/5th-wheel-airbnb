
exports.up = function(knex) {
    return knex.schema.createTable('properties', properties => {
        properties.increments();

        properties
        .string('location', 128)
        .notNullable();

        properties
        .string('description', 200)

        properties
        .integer('price').notNullable();

        
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('properties');
  
};
