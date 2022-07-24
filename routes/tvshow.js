const express = require('express');
const {
  createShow,
  readShows,
  updateShow,
  deleteShow,
} = require('../controllers/tvShow');
const router = express.Router();
const {
  isSignin,
  getUserById,
  isAuthenticated,
} = require('../middlewares/auth');
const { check } = require('express-validator');

//Get User By Id Parameter
router.param('userId', getUserById);

router.post(
  '/tvshow/create/:userId',
  [
    check('title', 'title cannot be empty').notEmpty(),
    check('streamingApp', 'streaming app cannot be empty').notEmpty(),
    check('rating', 'rating cannot be empty and must be numeric')
      .notEmpty()
      .isNumeric(),
    check('review', 'review cannot be empty').notEmpty(),
  ],
  isSignin,
  isAuthenticated,
  createShow
);

router.get('/tvshow/read/:userId', isSignin, isAuthenticated, readShows);

router.put(
  '/tvshow/update/:userId',
  [
    check('title', 'title cannot be empty').notEmpty(),
    check('streamingApp', 'streaming app cannot be empty').notEmpty(),
    check('rating', 'rating cannot be empty and must be numeric')
      .notEmpty()
      .isNumeric(),
    check('review', 'review cannot be empty').notEmpty(),
  ],
  isSignin,
  isAuthenticated,
  updateShow
);

router.delete('/tvshow/delete/:userId', isSignin, isAuthenticated, deleteShow);

module.exports = router;
