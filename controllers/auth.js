const User = require('../models/user');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { username, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(403).json({
      message: errors.array()[0].msg,
    });
  }

  User.findOne({ username }, async (err, user) => {
    if (err || !user) {
      return res.status(403).json({
        message: 'Username Does Not Exists',
      });
    }
    const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword) {
      const { _id } = user;
      const token = jwt.sign({ _id: user._id }, process.env.SECRET);

      return res.status(200).json({
        token,
        user: { _id },
      });
    } else {
      return res.status(401).json({
        message: 'Username Password does not match',
      });
    }
  });
};