const Property = require('../properties/prop-model.js');

module.exports = async function(req, res, next) {
  try {
    const property = await Property.findById(req.body.property_id);
    console.log(property);
    if (property) {
      next();
    } else {
      res.status(400).json({ message: 'Property Id not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error Validating Property ID' });
  }
};
