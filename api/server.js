const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('../auth/auth-router.js');
// const usersRouter = require('../users/users-router.js');
const propRouter = require('../properties/propRouter');
const rentalRouter = require('../rentals/rentalRouter');
const sessionOptions = {
  name: 'mycookie',
  secret: 'chocolate',
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
// knexSessionStore(session);

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionOptions));

server.use('/api/auth', authRouter);
// server.use('/api/users', usersRouter);
server.use('/api/properties', propRouter);
server.use('/api/rentals', rentalRouter);

server.get('/', (req, res) => {
  res.json({ api: 'Welcome to 5th Wheel Air B & B !' });
});

module.exports = server;
