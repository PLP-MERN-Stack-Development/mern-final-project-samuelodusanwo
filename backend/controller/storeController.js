const mongoose = require('mongoose');
const Store = require('../model/Store');


// Create store
const createStore = async (req, res) => {
    try {
        const { name, phone_number } = req.body;

        // Validate input
        if (!name || !req.files || !phone_number) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        // Create user
        const store = await Store.create({
            name: name.trim(),
            logo: `/uploads/${req.files[0].filename}`,
            phone_number,
            user: req.userId
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

        return res.status(200).json({
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

// get personal store
const myStore = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid id"
            })
        }

        const stores = await Store.find({user: id});

        return res.status(200).json({
            success: true,
            data: stores,
            message: "Successfully retreiving all personal store"
        })
    } catch (err) {
        console.log("Error getting personal stores: ", err)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


module.exports = { createStore, getAllStore, myStore }