const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
    const {id} =req.params;
     console.log(req.session.user)
    if ( req.session && req.session.user) {
         
         
        next();
       
            } else {
              res.status(401).json({ message: `Must be logged in as user ${id} to view message` });
            }






}