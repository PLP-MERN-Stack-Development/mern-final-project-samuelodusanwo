const User = require('../model/User');
const bcrypt = require('bcryptjs');


// Create user
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await User.signup(name, email, password)

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch(err) {
        console.log("User creation error: ", err)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

// Login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.login(email, password);

        return res.status(200).json({
            success: true,
            data: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (err) {
        console.log("User login error: ", err)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
};

module.exports = { createUser, loginUser };