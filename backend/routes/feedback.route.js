// routes/feedback.js
const express = require("express");
const Feedback = require("../models/feedbackModel");
const Sentiment = require("sentiment");
const sentiment = new Sentiment();
const router = express.Router();

router.post("/feedback", async (req, res) => {
    const { userId, eventId, feedbackText } = req.body;

    try {
        const result = sentiment.analyze(feedbackText);
        const sentimentScore = result.score;
        let category = "neutral";

        if (sentimentScore > 0) category = "positive";
        else if (sentimentScore < 0) category = "negative";

        const feedback = new Feedback({
            userId,
            eventId,
            feedbackText,
            sentimentScore,
            category
        });

        await feedback.save();
        res.status(200).json({ message: "Feedback submitted successfully!", feedback });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
