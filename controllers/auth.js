const User = require('../models/user');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signin = async (req, res) => {
  const errors = validationResult(req);
  const { username, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(403).json({
      message: errors.array()[0].msg,
      code: 403,
    });
  }

  const user = await User.findOne({ username });

  if (user) {
    const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword) {
      const { _id } = user;
      const token = jwt.sign({ _id: user._id }, process.env.SECRET);

      return res.status(200).json({
        token,
        user: { _id },
        code: 200,
      });
    }
  } else {
    return res.status(401).json({
      message: 'Username Password does not match',
      code: 401,
    });
  }
};

exports.signup = async (req, res) => {
  const errors = validationResult(req);
  const { username, password } = req.body;
  if (!errors.isEmpty()) {
    return res.status(403).json({
      message: errors.array()[0].msg,
      code: 403,
    });
  }

  // creating a new mongoose doc from user data
  const user = new User({ username, password });

  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);

  // now we set user password to hashed password
  user.password = await bcrypt.hash(user.password, salt);

  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        message: 'Something went wrong',
        status: 400,
        det: err.message,
      });
    }

    res.json({
      username: user.username,
      encry_password: user.password,
      status: 200,
      message: 'Successfully created account, Signin and Chill!',
    });
  });
};
