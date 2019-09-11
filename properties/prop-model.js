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
  return db('properties');
}

function findBy(filter) {
  return db('properties').where(filter);
}

function findById(id) {
  return db('properties')
    .where({ id })
    .first();
}

function insert(property) {
  return db('properties')
    .insert(property)
    .then(() => {
      return find();
    });
}

function update(id, changes) {
  return db('properties')
    .where({ id })
    .update(changes)
    .then(() => {
      return db('properties');
    });
}

function remove(id) {
  return db('properties')
    .where({ id })
    .del();
}
