const User = require('../models/user');
const TvShow = require('../models/tvshow');
const { validationResult } = require('express-validator');
const { mongoose } = require('mongoose');

exports.createShow = (req, res) => {
  const errors = validationResult(req);
  const { title, streamingApp, rating, review } = req.body;

  if (!errors.isEmpty()) {
    //HTTP Code 406: Method Not Allowed
    return res.status(406).json({
      message: errors.array()[0].msg,
      code: 406,
    });
  }
  TvShow.create(
    {
      userId: req.auth._id,
      title,
      streamingApp,
      rating,
      review,
    },
    (err, show) => {
      if (err) {
        return res.status(406).json({
          message: 'Something went wrong',
          code: 406,
        });
      }
      res.send({
        user: req.auth._id,
        body: req.body,
        code: 200,
      });
    }
  );
};

exports.readShows = (req, res) => {
  const user = req.user;
  TvShow.find({ userId: user._id }, (err, shows) => {
    if (err) {
      return res.status(406).json({
        message: 'Something went wrong',
      });
    }
    res.send({
      shows,
    });
  });
};

exports.updateShow = async (req, res) => {
  const user = req.user;
  const { showId, title, streamingApp, rating, review } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //HTTP Code 406: Method Not Allowed
    return res.status(406).json({
      message: errors.array()[0].msg,
      code: 406,
    });
  }

  TvShow.findByIdAndUpdate(
    { _id: showId },
    { title, streamingApp, rating, review },
    (err, updated) => {
      if (err) {
        return res.status(406).json({
          message: 'Something went wrong',
          code: 406,
        });
      }
      res.status(200).send({
        updated,
        code: 200,
      });
    }
  );
};

exports.deleteShow = async (req, res) => {
  const user = req.user;
  const { _id } = req.body;

  TvShow.findByIdAndRemove({ _id: _id }, (err, deleted) => {
    if (err) {
      return res.status(406).json({
        message: 'Something went wrong',
        code: 406,
      });
    }
    res.status(200).send({
      deleted,
      code: 200,
    });
  });
};
