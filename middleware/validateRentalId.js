const Rental = require('../rentals/rental-model.js');

module.exports = async function(req, res, next) {
  try {
    const rental = await Rental.findById(req.params.id);
    if (rental) {
      req.rental = rental;
      next();
    } else {
      res.status(404).json({ message: 'Rental Id not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error validating Rental' });
  }
};
