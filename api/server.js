require('dotenv').config();
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const aws = require('aws-sdk');

const multer = require('multer');
const multerS3 = require('multer-s3');

const restricted = require('../auth/restricted-middleware.js');
const authRouter = require('../auth/auth-router.js');
// const usersRouter = require('../users/users-router.js');
const propRouter = require('../properties/propRouter');
const rentalRouter = require('../rentals/rentalRouter');

//cookies
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

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionOptions));

server.use('/api/auth', authRouter);
server.use('/api/properties', restricted, propRouter);
server.use('/api/rentals', restricted, rentalRouter);

server.get('/', (req, res) => {
  res.json({ api: 'Welcome to 5th Wheel Air B & B !' });
});


module.exports = server;
