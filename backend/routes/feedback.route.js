const express = require("express");
const Feedback = require("../models/feedbackModel");
const Event = require("../models/eventModel");
const User = require("../models/userModel");
const Sentiment = require("sentiment");
const sentiment = new Sentiment();
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/submit", async (req, res) => {
    const { title, feedbackText} = req.body;
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    console.log(token);


    try {
        // 🛑 Token check
        // if (!token) return res.status(401).json({ message: "Unauthorized" });

        // const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // const userId = decoded.id;
        // const user = await User.findById(userId);

        const result = sentiment.analyze(feedbackText);
        const sentimentScore = result.score;
        let category = "neutral";

        if (sentimentScore > 0) category = "positive";
        else if (sentimentScore < 0) category = "negative";

        // 💾 Save feedback
        const feedback = new Feedback({
            title,
            feedbackText,
            sentimentScore,
            category,
        });

        await feedback.save();
        res.status(200).json({ message: "Feedback submitted successfully!", feedback });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
router.get('/getFeedback', async (req, res) => {
    try {
      const response = await Feedback.find(); 
      res.json(response);  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" }); 
    }
  });
  
router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEvent = await Event.findByIdAndDelete(id);

        if (!deletedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.json({ message: "Event deleted successfully", id: deletedEvent._id });
    } catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).json({ message: "Failed to delete event" });
    }
});

module.exports = router;
