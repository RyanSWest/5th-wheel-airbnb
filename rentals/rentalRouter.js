const express = require('express');
const router = express.Router();

const validateRentalId = require('../middleware/validateRentalId.js');
const validateRenterType = require('../middleware/validateRenterType.js');
const validatePropertyId = require('../middleware/validatePropertyId.js');
const Rental = require('./rental-model.js');

// Reached via /api/rentals
router.get('/', async (req, res) => {
  try {
    const rentals = await Rental.find();
    res.status(200).json(rentals);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'There was an eror retrieving rentals' });
  }
});

// get rentals by id

router.get('/:id', validateRentalId, async (req, res) => {
  res.status(200).json(req.rental);
});

// Add rental reservation
router.post(
  '/reservation',
  validateRenterType,
  validatePropertyId,
  async (req, res) => {
    try {
      const rental = await Rental.insert(req.body);
      res.status(201).json(rental);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'There was an error adding rental' });
    }
  }
);

//update reservation
router.put(
  '/reservation/:id',
  validateRentalId,
  validateRenterType,
  validatePropertyId,
  async (req, res) => {
    const { id } = req.params;
    try {
      const rental = await Rental.update(id, req.body);
      res.status(201).json(rental);
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ message: 'There was an error updating reservation' });
    }
  }
);

//delete reservation

router.delete('/:id', validateRentalId, async (req, res) => {
  try {
    const deleted = await Rental.remove(req.params.id);
    console.log(deleted);
    if (deleted == 1) {
      const rentals = await Rental.find();
      res.status(200).json(rentals);
    } else {
      res.status(400).json({ message: 'rental not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'error deleting reservation' });
  }
});

//Validate Rental Id exists
// async function validateRentalId(req, res, next) {
//   try {
//     const rental = await Rental.findById(req.params.id);
//     if (rental) {
//       req.rental = rental;
//       next();
//     } else {
//       res.status(404).json({ message: 'Rental Id not found' });
//     }
//   } catch (err) {
//     res.status(500).json({ message: 'Error validating Rental' });
//   }
// }

//validate renter_id belongs to a renter

//validate land-

module.exports = router;
