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
router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Event ID received in backend:", id); 

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
