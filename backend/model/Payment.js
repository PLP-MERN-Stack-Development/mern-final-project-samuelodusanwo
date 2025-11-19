const mongoose = require('mongoose')


const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    total_price: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Payment', paymentSchema);