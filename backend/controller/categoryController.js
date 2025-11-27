const Category = require('../model/Category');


// create category
const createCategory = async (req, res) => {
    try {
        const { title } = req.body;

        // Validate input
        if (!title || !req.files || req.files.length === 0 ){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const uploadedFile = req.files[0]

        console.log("datas: ", title)
        console.log("datas: ", uploadedFile)

        const category = await Category.create({
            title: title.trim(),
            title: title,
            image: `/uploads/${uploadedFile.filename}`
        });

        return res.status(201).json({
            success: true,
            data: category,
            message: "Successfully created category"
        })
    } catch (err) {
        console.log("Error creating category: ", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

// list all category
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();

        return res.status(200).json({
            success: true,
            data: categories,
            message: "Successfully retrieved categories"
        })
    } catch (err) {
        console.log("Error getting all category: ", err.message)

        if (err.message === "All fields are required") {
            return res.status(400).json({
                success: false,
                message: err.message
            })
        }

        if (err.message === "Name doesn't exist") {
            return res.status(401).json({
                success: false,
                message: "Invalid username"
            })
        }

        if (err.message === "Incorrect password") {
            return res.status(401).json({
                success: false,
                message: "Incorrect password"
            })
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = { getAllCategories, createCategory };