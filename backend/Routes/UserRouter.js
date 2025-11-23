const express = require('express');
const router = express.Router();
const { createUser, loginUser } = require('../controller/userController');


// create user
router.post('/register', createUser);

// get user
router.post('/login', loginUser);

module.exports = router;