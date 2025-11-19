require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();


// Middlewares
app.use(cors());
app.use(express.json());


// Mongodb connection
// mongoose.connect(process.env.MONGO_URL || process.env.MONGO_DB)
mongoose.connect(process.env.MONGO_DB)
    .then(() => console.log("Successfully connected"))
    .catch(err => console.log("Mongodb connection error: ", err))


// listen port
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`)
})