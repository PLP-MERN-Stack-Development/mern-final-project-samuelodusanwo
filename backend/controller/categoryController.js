const Category = require('../model/Category');


// create category
const createCategory = async (req, res) => {
    try {
        const { title, image } = req.body;

        // Validate input
        if (!title || !image){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const category = await Category.create({ title, image })

        return res.status(201).json({
            success: true,
            data: category,
            message: "Successfully created category"
        })
    } catch (err) {
        console.log("Erorr creating category: ", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

// list all category
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find()

        return res.status(200).json({
            success: true,
            data: categories,
            message: "Successfully retrieved categories"
        })
    } catch (err) {
        console.log("Error getting all category: ", err)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

module.exports = { getAllCategories, createCategory };