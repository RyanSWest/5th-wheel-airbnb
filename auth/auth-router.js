const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js');

// for endpoints beginning with /api/auth
router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.status(200).json({
          message: `Welcome ${user.username}!`
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.send('unable to logout...');
      } else {
        res.send('thank you for using 5th wheel air b&b');
      }
    });
  } else {
    res.end();
  }
});

router.put('/edituser/:id', async (req, res) => {
  try {
    const user = await Users.update(req.params.id, req.body);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating user information' });
  }
});

router.delete('/deleteuser/:id', (req, res) => {
  try {
    const deleted = Users.remove(req.params.id);
    if (deleted) {
      res.status(200).json({ message: 'user deleted' });
    } else {
      res.status(400).json({ message: 'User not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'error deleting user' });
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await Users.find();
    console.log(users);
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'error retrieving users' });
  }
});

module.exports = router;
