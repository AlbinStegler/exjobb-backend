const { database, event } = require('../database/database.js');
const ObjectId = require('mongodb').ObjectId;

const eventModel = {
    getEvents: async function getEvents(req, res) {
        try {
            const data = await event.find();
            return res.json(data);
        } catch (error) {
            console.error('Error fetching users:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    addEvent: async function addEvent(req, res) {
        try {
            // Assuming req.body contains the user data in the expected format
            const eventData = req.body;
            console.log('Event data:', eventData);
            // Insert the user data into the database
            const result = await event.create(eventData);

            console.log('Event added:', req.body.eventName);

            // Return success response
            return res.json({ message: 'Event added', insertedId: result.insertedId });
        } catch (error) {
            console.error('Error adding event:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    deleteEvent: async function deleteEvent(req, res) {
        try {
            const id = req.params.id;
            console.log('Event id:', id);
            const result = await event.deleteOne({ _id: id });
            console.log('Event deleted:', result.deletedCount);
            return res.json({ message: 'Event deleted', deletedCount: result.deletedCount });
        } catch (error) {
            console.error('Error deleting event:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    activateEvent: async function activateEvent(req, res) {
        try {
            // Check if there is an active event
            const filter1 = { active: true };
            const activeEvent = await event.findOne(filter1);
            if (activeEvent) {
                await event.updateOne({ _id: activeEvent._id }, { $set: { active: false } });
            }
            const filter2 = { eventName: req.body.eventName };
            const result = await event.findOneAndUpdate(filter2, { $set: { active: true } }, { new: true });

            return res.json({ message: 'Event activated', modifiedCount: result ? 1 : 0 });
        } catch (error) {
            console.error('Error activating event:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

    },
    getActiveEvent: async function getActiveEvents(req, res) {
        try {
            const data = await event.findOne({ active: true });
            return res.json(data);
        } catch (error) {
            console.error('Error fetching event:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    // Send the seat object in the request body to mark it as booked
    bookSeat: async function bookSeat(req, res) {
        try {
            let row = req.body.seat.row;
            let nr = req.body.seat.nr;

            const filter = { active: true };
            const activeEvent = await event.findOne(filter);

            if (!activeEvent) {
                return res.status(400).json({ error: 'No active event' });
            }

            let updateQuery = {};
            updateQuery[`seats.${row}.${nr}`] = "booked";
            if (activeEvent.seats[row][nr] === "booked") {
                return res.status(400).json({ error: 'Seat already booked' });
            }
            const result = await event.updateOne(filter, { $set: updateQuery });

            console.log(result);

            return res.status(200).json({ message: 'Seat booked successfully' });
        } catch (error) {
            console.error('Error booking seat:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    unbookSeat: async function unbookSeat(req, res) {
        try {
            let row = req.body.seat.row;
            let nr = req.body.seat.nr;

            const filter = { active: true };
            const activeEvent = await event.findOne(filter);

            if (!activeEvent) {
                return res.status(400).json({ error: 'No active event' });
            }

            let updateQuery = {};
            updateQuery[`seats.${row}.${nr}`] = "free";
            if (activeEvent.seats[row][nr] === "free") {
                return res.status(400).json({ error: 'Seat already free' });
            }
            const result = await event.updateOne(filter, { $set: updateQuery });

            console.log(result);

            return res.status(200).json({ message: 'Seat unbooked successfully' });
        } catch (error) {
            console.error('Error unbooking seat:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

module.exports = eventModel;