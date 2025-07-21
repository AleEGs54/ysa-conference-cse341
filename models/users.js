const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
    },
    password: {
        type: String,
        required: true,
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{5,}$/,
            'Password must be at least 5 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character',
        ],
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Email is invalid'],
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'staff', 'employee'],
    },
});

//Creates the model and then exports it.
module.exports = mongoose.model('User', userSchema);
