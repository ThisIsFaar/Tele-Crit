const User = require('../models/user');
const TvShow = require('../models/tvshow');
const { validationResult } = require('express-validator');
const { mongoose } = require('mongoose');

exports.createShow = (req, res) => {
  const errors = validationResult(req);
  const { title, streamingApp, rating, review, publishMode, byUsername } =
    req.body;

  if (!errors.isEmpty()) {
    //HTTP Code 406: Method Not Allowed
    return res.status(406).json({
      message: errors.array()[0].msg,
      code: 406,
    });
  }
  const obj = {
    userId: req.auth._id,
    title,
    streamingApp,
    rating,
    review,
    publishMode,
    byUsername,
  };
  TvShow.create(obj, (err, show) => {
    if (err) {
      return res.status(406).json({
        message: 'Something went wrong',
        code: 406,
      });
    }
    const data = {
      id: show._id.toString(),
      userId: show.userId,
      title: show.title,
      streamingApp: show.streamingApp,
      rating: show.rating,
      review: show.review,
      publishMode: show.publishMode,
      byUsername: show.byUsername,
    };
    res.send({
      data: data,
      code: 200,
    });
  });
};

exports.readAllShows = (req, res) => {
  const user = req.user;
  TvShow.find((err, shows) => {
    if (err) {
      return res.status(406).json({
        message: 'Something went wrong',
      });
    }
    const data = shows.map((show) => {
      return {
        id: show._id.toString(),
        userId: show.userId,
        title: show.title,
        streamingApp: show.streamingApp,
        rating: show.rating,
        review: show.review,
        publishMode: show.publishMode,
        byUsername: show.byUsername,
      };
    });
    res.send({
      data,
      code: 200,
    });
  });
};

exports.readShows = (req, res) => {
  const user = req.user;
  TvShow.find({ userId: user._id }, (err, shows) => {
    if (err) {
      return res.status(406).json({
        message: 'Something went wrong',
      });
    }
    const data = shows.map((show) => {
      return {
        id: show._id.toString(),
        userId: show.userId,
        title: show.title,
        streamingApp: show.streamingApp,
        rating: show.rating,
        review: show.review,
        publishMode: show.publishMode,
        byUsername: show.byUsername,
      };
    });
    res.send({
      data,
      code: 200,
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
    (err, show) => {
      if (err) {
        return res.status(406).json({
          message: 'Something went wrong',
          code: 406,
        });
      }
      const result = {
        id: show._id.toString(),
        userId: show.userId,
        title,
        streamingApp,
        rating,
        review,
        publishMode,
        byUsername,
      };
      res.status(200).send({
        result,
        code: 200,
      });
    }
  );
};

exports.deleteShow = async (req, res) => {
  // console.log(req.body);
  const { id } = req.body;
  TvShow.findByIdAndRemove(id, (err, deleted) => {
    if (err) {
      return res.status(406).json({
        message: 'Something went wrong',
        code: 406,
      });
    }
    res.status(200).send({
      deletedShowId: id,
      code: 200,
    });
  });
};
