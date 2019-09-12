const router = require('express').Router();

const Users = require('./users-model.js');
// const restricted = require('../auth/restricted-middleware.js');

router.get('/', (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});


//get user by ID
router.get('/:id', async (req, res)=> {
  res.status(200).json(req.body)
})

/// Check messages  

router.get('/:id/messages', async (req, res)=> {
  res.status(200).json(req.body.messages)
})
 
//Send message to user with this ID
router.put('/:id', async (req, res)=> {
  const {id} =req.params;
  try{
    const user = await Users.update(id, req.body.messages);
    res.status(201).json(user);
  }catch(err){
    console.log(err)
    res.status(500)
    .json({message: 'cannot update.'})
  }
})

router.delete('/:id', async (req, res) => {
  try {
      const deleted = Users.remove(req.params.id)
      console.log(deleted)
      if (deleted == 1) {
        const users= await Users.find();
        res.status(200).json(users);
           
      } else {
          res.status(404).json({ errorMessage: 'User not found...' })
      }
  } catch (error) {
      console.log(error)
      res.status(500).json({
          errorMessage: 'Error removing the user.'
      })
  }
})

module.exports = router;
