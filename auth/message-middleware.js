const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
    const {id} =req.params;
    const{id2}=req.session.user.id
     console.log(req.session.user.id)
     const user =   Users.findById(req.params.id);
      console.log("88",{id}, '77' ,req.session.user.id )
    if ( {id} === req.session.user.id) {
         
         
        next();
       
            } else {
              res.status(401).json({ message: `Must be logged in as user ${id} to view message` });
            }






}