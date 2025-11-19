const Store = require('../model/Store');


// Create store
const createStore = async (req, res) => {
    try {
        const { name, logo, phone_number, user } = req.body;

        // Validate input
        if (!name || !logo || !phone_number || !user) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const store = await Store.create({
            name: name.trim(),
            logo,
            phone_number,
            user
        })

        return res.status(201).json({
            success: true,
            data: store,
            message: "Created store successfully"
        })
    } catch (err) {
        console.log("Error creating store: ", err)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

// get all stores
const getAllStore = async (req, res) => {
    try {
        const store = await Store.find().sort({ createdAt: -1 })

        return res.staus(200).json({
            success: true,
            data: store,
            message: "Successfully retreiving all store"
        })
    } catch (err) {
        console.log("Error getting all stores: ", err)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


module.exports = { createStore }