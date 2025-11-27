const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const requireAuth = require('../middleware/requireAuth');
const { getAllCategories, createCategory } = require('../controller/categoryController');


// get categories
router.get('/', getAllCategories);

// create categories
// router.post('/create-category', requireAuth, upload.single("image"), createCategory);
router.post('/create-category', requireAuth, upload, createCategory);

module.exports = router;