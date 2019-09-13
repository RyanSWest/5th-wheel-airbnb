const db = require('../database/dbConfig.js');

module.exports = {
  find,
  findBy,
  findById,
  insert,
  remove
};

function find() {
  return db('photos');
}

function findBy(filter) {
  return db('photos').where(filter);
}

function findById(id) {
  return db('photos')
    .where({ id })
    .first();
}

function remove(id) {
  return db('photos')
    .where({ id })
    .del();
}
