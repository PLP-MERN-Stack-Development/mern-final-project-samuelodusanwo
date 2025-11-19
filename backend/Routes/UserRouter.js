const express = require('express');
const router = express.Router();
const { createUser, loginUser } = require('../controller/userController');


// create user
router.post('/', createUser);

// get user
router.get('/', loginUser);