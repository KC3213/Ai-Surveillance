const express = require('express');
const router = express.Router();
const { signup, login, logout, getActiveUsers } = require('../controller/authControllers.js');

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/active-users', getActiveUsers);

module.exports = router;
