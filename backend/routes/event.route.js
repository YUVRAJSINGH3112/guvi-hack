const express = require("express");
const Event = require("../models/eventModel");
const router = express.Router();

router.get("/events", async (req, res) => {
    try {
        const events = await Event.find({});
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
