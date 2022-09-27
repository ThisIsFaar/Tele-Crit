const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { signin, signup } = require('../controllers/auth');

router.post(
  '/signin',
  [
    check('username', 'Username is not correct')
      .isAlphanumeric()
      .isLength({ min: 6 }),
    check('password', 'Password is not correct').isLength({
      min: 6,
    }),
  ],
  signin
);

router.post(
  '/signup',
  [
    check('username', 'Username is not correct')
      .isAlphanumeric()
      .isLength({ min: 6 }),
    check('password', 'Password is not correct').isLength({
      min: 6,
    }),
  ],
  signup
);

module.exports = router;
