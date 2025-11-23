const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { getAllProducts, createProduct, productsByCategory, productsByStore } = require('../controller/productController');
const requireAuth = require('../middleware/requireAuth');


// get all products
router.get('/collections', requireAuth, getAllProducts);

// create product
router.post('/create', requireAuth, upload.single('image'), createProduct);

// products by category
router.get('/category/:id', requireAuth, productsByCategory);

// products by shop
router.get('/productByShop/:id', requireAuth, productsByStore);

module.exports = router;