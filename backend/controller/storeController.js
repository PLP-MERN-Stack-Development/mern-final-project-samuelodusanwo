const mongoose = require('mongoose');
const Store = require('../model/Store');


// Create store
const createStore = async (req, res) => {
    try {
        const { name, phone_number, user } = req.body;

        // Validate input
        if (!name || !req.file || !phone_number || !user) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        // validate id
        if (!mongoose.Types.ObjectId(user)) {
            return res.status(400).json({
                success: false,
                error: "Invalid user id"
            })
        }

        // Create user
        const store = await Store.create({
            name: name.trim(),
            logo: `/uploads/${req.file.filename}`,
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


module.exports = { createStore, getAllStore }