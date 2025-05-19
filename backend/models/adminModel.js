const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    adminCode: {
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['admin', 'user'],
        default: 'admin',
    }
});

module.exports = mongoose.model('admin', adminSchema);
