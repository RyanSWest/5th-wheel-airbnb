require('dotenv').config();
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

// const aws = require('aws-sdk');

// const multer = require('multer');
// const multerS3 = require('multer-s3');

const restricted = require('../auth/restricted-middleware.js');
const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const propRouter = require('../properties/propRouter');
const rentalRouter = require('../rentals/rentalRouter');
<<<<<<< HEAD

//cookies
const sessionOptions = {
=======
 const sessionOptions = {
>>>>>>> added message function
  name: 'mycookie',
  secret: process.env.SESSION_SECRET || 'chocolate',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true
  },
  httpOnly: true,
  resave: false,
  saveUninitialized: false,

  store: new knexSessionStore({
    knex: require('../database/dbConfig'),
    tablename: 'sessions',

    sidfieldname: 'sid',
    createTable: true,
    clearInterval: 1000 * 60 * 60
  })
};

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionOptions));

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);
<<<<<<< HEAD
server.use('/api/properties', restricted, propRouter);
server.use('/api/rentals', restricted, rentalRouter);
server.use('/api/upload', Upload);

=======
server.use('/api/properties', propRouter);
server.use('/api/rentals', rentalRouter);
  
>>>>>>> added message function
server.get('/', (req, res) => {
  res.json({ api: 'Welcome to 5th Wheel Air B & B !' });
});
server.post('/single', upload.single('test'), (req, res) => {
  try {
    res.send(req.file);
  } catch (err) {
    res.send(400).statusMessage({ message: 'Error uploading photo' });
  }
});

/** AWS catalog */

// aws.config.update({
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   region: 'us-west-1'
// });

// const s3 = new aws.S3();
// const awsStorage = multerS3({
//   s3: s3,
//   bucket: process.env.AWS_BUCKET_NAME,
//   key: function(req, file, cb) {
//     console.log(file);
//     cb(null, file.originalname);
//   }
// });

// const upload = multer({
//   /**if you are using local storage than use
//    * storage: fileStorage,
//    * if you are using aws storage than use
//    * storage: awsStorage,
//    */
//   storage: awsStorage,
//   limits: { fileSize: 5000000 }
//   // fileFilter: function(req, file, cb) {
//   //   checkFileType(file, cb);
//   // }
// });
// server.post('/upload/:id', upload.single('profile'), (req, res, err) => {
//   try {
//     const imageUrl = req.file.location;
//     const property_id = req.params.id;
//     const data = req.file;
//     const package = { property_id, imageUrl, data };
//     res.send(package);
//   } catch (err) {
//     res.send(400);
//   }
// });

module.exports = server;
