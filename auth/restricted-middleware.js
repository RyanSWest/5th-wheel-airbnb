const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
  // const { username, password } = req.headers;

  if ( req.session && req.session.user) {
    console.log(req.session)
     
    next();
   
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      
  
};
