const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required']
    },
    description: {
        type: String,
        required: true,
        maxlength: [1000, 'Description cannot be 1000 character long']
    },
    image: {
        type: String,
        required: [true, 'Product image is required']
    },
    price: {
        type: Number,
        required: [true, 'Price cannot be empty'],
        min: [0, 'Price cannot be negative']
    },
    store: {
        type: mongoose.Types.ObjectId,
        ref: 'Store',
        required: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Product', productSchema);