const Product = require('../model/Product');


// Create Products
const createProduct = async (req, res) => {
    try {
        const { name, description, image, price, store, category, user } = req.body;

        // Validate inputs
        if (!name || !description || !image || !price || !store || !category || !user) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
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
            image,
            price: Number(price),
            store,
            category,
            user
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
        const { store, category, page = 1, limit = 10 } = res.query;

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

module.exports = { getAllProducts, createProduct }