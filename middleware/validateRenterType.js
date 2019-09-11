const User = require('../users/users-model.js');

module.exports = async function(req, res, next) {
  try {
    console.log(req.body.renter_id);
    const user = await User.findById(req.body.renter_id);
    console.log(user.user_type);
    if (user.user_type === 'rv-owner') {
      next();
    } else {
      res.status(400).json({ message: 'Renter ID must belong to an RV owner' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error validating renterID' });
  }
};
