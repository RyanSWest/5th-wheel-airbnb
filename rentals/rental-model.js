const db = require('../database/dbConfig.js');

module.exports = {
  find,
  findBy,
  findById,
  insert,
  update,
  remove
};

function find() {
  return db('rentals');
}

function findBy(filter) {
  return db('rentals').where(filter);
}

function findById(id) {
  return db('rentals')
    .where({ id })
    .first();
}

function insert(rental) {
  return db('rentals')
    .insert(rental)
    .then(() => {
      return db('rentals');
    });
}

function update(id, changes) {
  return db('rentals')
    .where({ id })
    .update(changes)
    .then(() => {
      return db('rentals');
    });
}

function remove(id) {
  return db('rentals')
    .where({ id })
    .del();
}
