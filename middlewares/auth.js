const { expressjwt } = require('express-jwt');
const User = require('../models/user');

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'No user found',
      });
    }
    req.user = user;
    next();
  });
};

exports.isSignin = expressjwt({
  secret: process.env.SECRET,
  algorithms: ['HS256'],
});

exports.isAuthenticated = (req, res, next) => {
  let checker = req.user && req.auth && req.user._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: 'Access denied',
    });
  }
  next();
};
