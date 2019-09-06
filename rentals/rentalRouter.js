const express = require('express');
const router = express.Router();

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

router.get(':/id', async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);
    if (rental) {
      res.status(200).json(rental);
    } else {
      res.status(404).json({ message: 'Rental not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to retrieve Rental' });
  }
});

router.post('/', async (req, res) => {
  try {
    const rental = await Rental.insert(req.body);
    res.status(201).json(rental);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'There was an error adding rental' });
  }
});

module.exports = router;
