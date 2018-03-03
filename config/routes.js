var express = require('express');
var router = express.Router();

var apiController = require('../controllers/apiController');

router.route('/')
  .get(apiController.welcome)

router.route('/setup')
  .get(apiController.setup)

router.route('/users')
  .get(apiController.users)

router.route('/authenticate')
  .post(apiController.auth)

module.exports = router;
