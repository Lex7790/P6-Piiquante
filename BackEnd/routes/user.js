const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user');
const password = require('../middleware/password');

router.post('/signup', password, userControllers.signup);
router.post('/login', userControllers.login);

module.exports = router;