const express = require('express');
const authMiddleware = require('../middlewares/auth');
const apiController = require('../controllers/apiController');
const authController = require('../controllers/authController');
const postsController = require('../controllers/postsController');

const router = express.Router();

router.route('/setup')
  .get(apiController.setup);

router.route('/authenticate')
  .post(authController.auth);

router.route('/posts')
  .get(postsController.allPosts);

router.route('/posts/:id')
  .get(postsController.onePost);

router.route('/users/clear')
  .get(apiController.clearUsers);
// Protect the routes below
router.use(authMiddleware);

// Show all users
router.route('/users')
  .get(apiController.getUsers);


module.exports = router;
