const router = require('express').Router();
const bcrypt = require('bcryptjs');
const restricted = require('./restricted-middleware.js');

const Users = require('../users/users-model.js');

// for endpoints beginning with /api/auth
router.post('/register', validateUserType, async (req, res) => {
  try {
    let user = req.body;
    const hash = await bcrypt.hashSync(user.password, 10); // 2 ^ n
    user.password = hash;

    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  } catch (err) {
    res.status(500).json({ message: 'Error Registering User' });
  }
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

router.put('/edituser/:id', restricted, validateUserId, async (req, res) => {
  try {
    const updated = await Users.update(req.params.id, req.body);
    console.log(updated);
    res.status(200).json({ message: 'Password updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user information' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const deleted = await Users.remove(req.params.id);
    if (deleted === 1) {
      res.status(200).json({ message: 'User Deleted' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'error deleting user' });
  }
});

//For Testing

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

//MIDDLEWARE
async function validateUserId(req, res, next) {
  try {
    const user = await Users.findById(req.params.id);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(400).json({ message: 'User Id not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error validating UserID' });
  }
}

function validateUserType(req, res, next) {
  if (req.body.user_type === 'land-owner') {
    console.log('land-owner middleware passed'), next();
  } else if (req.body.user_type === 'rv-owner') {
    console.log('rv-owner middleware passed'), next();
  } else {
    res.status(400).json({ message: 'User type must be an rv or land owner' });
  }
}

module.exports = router;
