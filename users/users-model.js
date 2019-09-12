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
  return db('users').select('id', 'username', 'user_type', 'messages');
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

// this function was changed to work with the Messenger.

function update(id, changes) {
  console.log('CHANGES', changes);
  db('users')
    .where({ id: id })
    .update(changes)
    .then(count => {
      console.log(count);
    })
    .catch(err => {
      console.log(err);
    });

  const user = findById(id);
  return user;
}
//   return db('users');
// }

function remove(id) {
  return db('users')
    .where({ id })
    .del();
}
