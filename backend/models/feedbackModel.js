const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    title:{
     type:String,
     required: true
    },
    feedbackText: {
        type: String,
        required: true
    },
    sentimentScore: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
