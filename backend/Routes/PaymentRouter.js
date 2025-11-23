const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const createPayment = require('../controller/paymentController');


// create payment
router.post('/', requireAuth, createPayment);

module.exports = router;