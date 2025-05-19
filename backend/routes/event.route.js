const express = require("express");
const Event = require("../models/eventModel");
const router = express.Router();


router.post('/create', async (req, res) => {
    try {
        const { name, description, organizer } = req.body;
        if (!name || !description ||!organizer) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newEvent = new Event({ name, description, organizer });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json({error, message: "Server error" });
    }
});
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
