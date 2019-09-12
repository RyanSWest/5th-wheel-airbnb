const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const restricted = require('../auth/restricted-middleware.js');

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const propRouter = require('../properties/propRouter');
const rentalRouter = require('../rentals/rentalRouter');
const sessionOptions = {
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
// knexSessionStore(session);

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionOptions));

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);
server.use('/api/properties', restricted, propRouter);
server.use('/api/rentals', restricted, rentalRouter);

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

module.exports = server;
