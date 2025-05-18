const express = require("express");
const Feedback = require("../models/feedbackModel");
const Event = require("../models/eventModel");
const User = require("../models/userModel");
const Sentiment = require("sentiment");
const sentiment = new Sentiment();
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/feedback", async (req, res) => {
    const { feedbackText, rating, eventId } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    try {
        // 🛑 Token check
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        // 🔓 Decode token to get userId
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        // 👤 Check if the user exists
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // 🎯 Check if the event exists
        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ message: "Event not found" });

        // 📝 Sentiment analysis
        const result = sentiment.analyze(feedbackText);
        const sentimentScore = result.score;
        let category = "neutral";

        if (sentimentScore > 0) category = "positive";
        else if (sentimentScore < 0) category = "negative";

        // 💾 Save feedback
        const feedback = new Feedback({
            userId,
            email: user.email,
            eventId,
            feedbackText,
            sentimentScore,
            category,
            rating
        });

        await feedback.save();
        res.status(200).json({ message: "Feedback submitted successfully!", feedback });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
