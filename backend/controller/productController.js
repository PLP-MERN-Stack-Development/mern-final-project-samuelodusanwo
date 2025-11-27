const mongoose = require('mongoose');
const Product = require('../model/Product');


// Create Products
const createProduct = async (req, res) => {
    try {
        const { name, description, price, shop, category } = req.body;
        console.log("name: ", name)
        console.log("description: ", description)
        console.log("price: ", price)
        console.log("store: ", shop)
        console.log("category: ", category)

        // Validate inputs
        if (!name || !description || !price || !shop || !category) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        // validate each ID separately
        if (!mongoose.Types.ObjectId.isValid(shop)) {
            return res.status(400).json({
                success: false,
                message: "Invalid store ID"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(category)) {
            return res.status(400).json({
                success: false,
                message: "Invalid category ID"
            });
        }

        // Check if price is integer
        if (isNaN(price) || Number(price) <= 0) {
            return res.status(400).json({
                success: false,
                message: "price must be a positive number"
            })
        }

        const product = await Product.create({
            name: name.trim(),
            description: description.trim(),
            image: `/uploads/${req.files[0].filename}`,
            price: Number(price),
            store: shop,
            category,
            user: req.userId
        });

        return res.status(201).json({
            success: true,
            data: product,
            message: "Successfully created product"
        });
    } catch (err) {
        console.log("Error creating product: ", err)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
};

// Retreive all products
const getAllProducts = async (req, res) => {
    try {
        const { store, category, page = 1, limit = 10 } = req.query;

        const filter = {}
        if (store) filter.store();
        if (category) filter.category();

        const products = await Product.find(filter)
            .populate('category', 'title')
            .populate('store', 'name')
            .populate('user', 'user email')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await Product.countDocuments(filter)

        return res.status(200).json({
            success: true,
            data: products,
            message: "Successfully retrieved all products",
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / limit)
        })
    } catch (err) {
        console.log("Error getting products: ", err)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
};

// Products by category
const productsByCategory = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid category id"
            })
        }

        const product = await Product.find({ category: id })

        return res.status(200).json({
            success: true,
            data: product,
            count: product.length,
            message: "Succesfully fetched products by category"
        })

    } catch(err) {
        console.log('Error fetching products by category: ', err)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

// products by shop
const productsByStore = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid store id"
            })
        }

        const product = await Product.find({ store: id })

        return res.status(200).json({
            success: true,
            data: product,
            count: product.length,
            message: "Succesfully fetched products by store"
        })

    } catch(err) {
        console.log('Error fetching products by store: ', err)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

module.exports = { getAllProducts, createProduct, productsByCategory, productsByStore }