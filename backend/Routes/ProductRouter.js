const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { getAllProducts, createProduct, productsByCategory, productsByStore } = require('../controller/productController');
const requireAuth = require('../middleware/requireAuth');


// get all products
router.get('/collections', getAllProducts);

// create product
// router.post('/create', requireAuth, upload.single('image'), createProduct);
router.post('/create', requireAuth, upload, createProduct);

// products by category
router.get('/category/:id', productsByCategory);

// products by shop
router.get('/productByShop/:id', productsByStore);

module.exports = router;