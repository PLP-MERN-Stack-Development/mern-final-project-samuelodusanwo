const Payment = require('../model/Payment');


const createPayment = async (req, res) => {
    try {
        const { total_price } = req.body;
        console.log("incoming: ", req.body)
        
        // Validate input
        if (!total_price) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const receipt = await Payment({
            user: req.userId,
            // quantity,
            total_price
        })

        return res.status(201).json({
            success: true,
            data: receipt,
            message: "Payment successful"
        })

    } catch(err) {
        console.log("Error creating payment: ", err)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


module.exports = createPayment;