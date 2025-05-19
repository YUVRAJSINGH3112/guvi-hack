const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,  // Timeout badhane ke liye
})
.then(() => {
    console.log("🚀 MongoDB connected successfully");
})
.catch((err) => {
    console.error("❌ MongoDB connection error:", err);
});

module.exports = mongoose.connection;
