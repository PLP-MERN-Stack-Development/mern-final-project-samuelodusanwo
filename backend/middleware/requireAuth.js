const jwt = require('jsonwebtoken');
const User = require('../model/User');


const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({
            success: false,
            message: "Request not authorized"
        })
    }

    const token = authorization.split(' ')[1];

    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(_id).select('_id');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        req.userId = user._id;

        next()
    } catch (err) {
        console.log("Authorization error: ", err)

        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            })
        }

        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: "Token expired"
            })
        }

        return res.status(401).json({
            success: false,
            message: "Unauthorized access"
        })
    }
}

module.exports = requireAuth;