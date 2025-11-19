const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: [2, 'Category name must be at least 2 character long']
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Category', categorySchema);