const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove
};

function find() {
  return db('users').select('id', 'username', 'user_type','messages');
}

function findBy(filter) {
  return db('users').where(filter);
}

async function add(user) {
  const [id] = await db('users').insert(user);

  return findById(id);
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

function update(id, changes) {
  db('users')
    .where({ id })
    .update(changes);
  return db('users');
}

function remove(id) {
  db('users')
    .where({ id })
    .del();
  return find();
}
