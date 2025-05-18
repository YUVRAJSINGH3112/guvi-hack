const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/guvi-hack').then(()=>{
    console.log('MongoDB connected successfully');
})
.catch((err)=>{
    console.error('MongoDB connection error:', err);
})

module.exports = mongoose.connection;