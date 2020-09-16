const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        minlength: 2
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    phone: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    city: {
        type: String,
        required: true,
        minlength: 2
    },
    role: {
        type: String,
        default: "user"
    }
});

module.exports = User = mongoose.model('user', UserSchema);