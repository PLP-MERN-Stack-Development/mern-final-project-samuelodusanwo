const express = require('express');
const { createStore, getAllStore } = require('../controller/storeController');
const router = express.Router();
const upload = require('../middleware/upload');
const requireAuth = require('../middleware/requireAuth');


// get all stores
router.get('/list-store', requireAuth, getAllStore);

// create store
router.post('/new-store', requireAuth, upload.single('image'), createStore);

module.exports = router;