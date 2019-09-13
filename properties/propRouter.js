const express = require('express');
const router = express.Router();
const Properties = require('./prop-model.js');
const User = require('../users/users-model.js');

const aws = require('aws-sdk');

const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: 'us-west-1'
});

const s3 = new aws.S3();
const awsStorage = multerS3({
  s3: s3,
  bucket: process.env.AWS_BUCKET_NAME,
  key: function(req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  }
});

const upload = multer({
  /**if you are using local storage than use
   * storage: fileStorage,
   * if you are using aws storage than use
   * storage: awsStorage,
   */
  storage: awsStorage,
  limits: { fileSize: 5000000 }
  // fileFilter: function(req, file, cb) {
  //   checkFileType(file, cb);
  // }
});
router.post('/upload/:id', upload.single('profile'), (req, res, err) => {
  try {
    const imageUrl = req.file.location;
    const property_id = req.params.id;
    const package = { property_id, imageUrl };
    res.send(package);
  } catch (err) {
    res.send(400);
  }
});

//accessed via /api/properties
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

router.get('/:id', validatePropertyId, async (req, res) => {
  res.status(200).json(req.property);
});

//ADD Property'

router.post('/', validateOwner, async (req, res) => {
  try {
    const property = await Properties.insert(req.body);
    res.status(201).json(property);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'There was an error adding property' });
  }
});

//ADD Property Photo

//Update Property

router.put('/:id', validatePropertyId, validateOwner, async (req, res) => {
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

async function validatePropertyId(req, res, next) {
  try {
    const property = await Properties.findById(req.params.id);
    console.log(property);
    if (property) {
      req.property = property;
      next();
    } else {
      res.status(400).json({ message: 'Property Id not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error Validating Property ID' });
  }
}

async function validateOwner(req, res, next) {
  try {
    const user = await User.findById(req.body.owner_id);
    console.log(user);
    if (user) {
      if (user.user_type === 'land-owner') {
        next();
      } else {
        res.status(400).json({ message: 'Owner ID must belong to Land owner' });
      }
    } else {
      res.status(400).json({ message: 'Owner Id not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error validating Owner type' });
  }
}
module.exports = router;
