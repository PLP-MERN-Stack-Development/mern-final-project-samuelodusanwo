const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [2, 'Name must be at least 2 character long']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    }
}, {
    timestamps: true
})

// create user
userSchema.statics.signup = async function(name, email, password) {
    // Validate input
    if (!name || !email || !password) {
        throw new Error ("All input are required")
    }

    // Validate email
    const existingEmail = await this.findOne({ email });
    if (existingEmail) {
        return res.status(400).json({
            success: false,
            message: "Email already exists"
        });
    };

    // Validate password
    if (!validator.isStrongPassword) {
        throw new Error("Password must be at least 8 characters uppercase, lowercase, number and symbol")
    }

    // hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // create db
    const user = await this.create({
        name,
        email,
        password: hashedPassword
    })

    return user
}

// login
userSchema.statics.login = async function(name, password) {
    // Validate input
    if (!name || !password) {
        throw new Error('All fields are required')
    };

    // check if user exist in db
    const user = await this.findOne({name});

    if (!user) {
        throw new Error("Name doesn't exist")
    };

    // validate password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new Error("Incorrect password")
    }

    return user;
}


module.exports = mongoose.model('User', userSchema);