var express = require('express');
var router = express.Router();
var user = require('../controllers/userController');


router.get('/', user.getUsers);

module.exports = router;
