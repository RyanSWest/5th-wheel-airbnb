const express = require('express');
const router = express.Router();
// const db = require('../database/dbConfig');
// const server = express();
// server.use(express.json());

const Properties = require('./prop-model.js');

// GET ALL
router.get('/', async (req, res) => {
  try {
    const props = await Properties.find();
    res.status(200).json(props);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve properties' });
  }
});

// GET by ID

router.get('/:id', async (req, res) => {
  try {
    const property = await Properties.findById(req.params.id);
    if (property) {
      res.status(200).json(property);
    } else {
      res.status(404).json({ message: 'Property not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to retrieve property' });
  }
});

//ADD Property'

router.post('/', async (req, res) => {
  try {
    const property = await Properties.insert(req.body);
    res.status(201).json(property);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'There was an error adding property' });
  }
});

//Update Property

router.put('/:id', async (req, res) => {
  try {
    const updated = await Properties.update(req.params.id, req.body);
    res.status(201).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'There was an error updating property' });
  }
});

//Delete Property
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Properties.remove(req.params.id);
    if (deleted == 1) {
      const properties = await Properties.find();
      res.status(200).json(properties);
    } else {
      res.status(400).json({ message: 'Invalid property Id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete property' });
  }
});

module.exports = router;
