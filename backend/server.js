require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();
const CategoryRouter = require('./Routes/CategoryRouter');
const PaymentRouter = require('./Routes/PaymentRouter');
const ProductRouter = require('./Routes/ProductRouter');
const StoreRouter = require('./Routes/StoreRouter');
const UserRouter = require('./Routes/UserRouter');


// Middlewares
app.use(cors());
app.use(express.json());

// Reading data coming from frontend
app.use((req, res, next) => {
    console.log("Request body: ", req.body)
    console.log("Request header: ", req.headers['content-type'])
    console.log("Request file: ", req.file)

    next();
})

// Server static files from uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes
app.use('/api/user', UserRouter);
app.use('/api/categories', CategoryRouter);
app.use('/api/payment', PaymentRouter);
app.use('/api/products', ProductRouter);
app.use('/api/stores', StoreRouter);

// error handleing
app.use((error, req, res, next) => {
    console.log(error.stack)
    return res.status(500).json({
        success: false,
        message: "Internal server error"
    })
})

// Mongodb connection
// mongoose.connect(process.env.MONGO_URL || process.env.MONGO_DB)
mongoose.connect(process.env.MONGO_DB)
    .then(() => console.log("Successfully connected"))
    .catch(err => console.log("Mongodb connection error: ", err))


// listen port
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`)
});