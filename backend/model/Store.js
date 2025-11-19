const mongoose = require('mongoose');


const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Shop name is required'],
        minlength: [2, 'Store name must be at least 2 character'],
        maxlength: [50, 'Store can not exceed 50 characters']
    },
    logo: {
        type: String,
        required: [true, 'Logo is required']
    },
    phone_number: {
        type: String,
        required: [true, 'phone number is required']
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Store', storeSchema);