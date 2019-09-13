const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');
const messageWare = require('../auth/message-middleware')
router.get('/',  (req, res) => {
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

router.get('/:id/messages', messageWare,  async (req, res)=> {
  console.log({message: req.body.messages, from: req.session.user.username})
  res.status(200).json({message: req.body.messages, from: req.session.user.username})
 
})
 
//Send message to user with this ID
router.put('/:id',async (req, res)=> {
  console.log(req.body.username)
  const {id} =req.params;
  try{
    const user = await Users.update(id, req.body.messages);
    res.status(201).json({message: `message sent to ${req.body.username}`});
    res.json(req.session.user.username)
  }catch(err){
    console.log(err)
    res.status(500)
    .json({message: 'cannot update.'})
  }
})

 

module.exports = router;
