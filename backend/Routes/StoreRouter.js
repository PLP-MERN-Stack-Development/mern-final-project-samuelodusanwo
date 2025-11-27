const express = require('express');
const { createStore, getAllStore, myStore } = require('../controller/storeController');
const router = express.Router();
const upload = require('../middleware/upload');
const requireAuth = require('../middleware/requireAuth');


// get all stores
router.get('/list-store', getAllStore);

// create store
// router.post('/new-store', requireAuth, upload.single('image'), createStore);
router.post('/new-store', requireAuth, upload, createStore);

// my-store
router.get("/my-store/:id", requireAuth, myStore)

module.exports = router;