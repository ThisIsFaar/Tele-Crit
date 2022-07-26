const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { signin } = require('../controllers/auth');

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

module.exports = router;
