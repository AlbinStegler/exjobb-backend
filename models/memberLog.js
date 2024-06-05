const { database, memberLog } = require('../database/database.js');
const ObjectId = require('mongodb').ObjectId;

const pastModel = {
    getLatest: async function getLatest(req, res) {
        try {
            const data = await memberLog.find().sort({ timestamp: -1 }).limit(1);
            return res.json(data);
        } catch (error) {
            console.error('Error fetching users:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getToday: async function getToday(req, res) {
        try {
            let date = new Date();
            date.setHours(0, 0, 0, 0);
            const data = await memberLog.find({ timestamp: { $gte: date } }).sort({ timestamp: -1 });
            return res.json(data);
        } catch (error) {
            console.error('Error fetching users:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getAll: async function getAll(req, res) {
        try {
            const data = await memberLog.find().sort({ timestamp: -1 });
            return res.json(data);
        } catch (error) {
            console.error('Error fetching users:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    createLog: async function createLog(req, res) {
        try {
            let log = { "nickname": req.body.nickname, "timestamp": new Date() };
            console.log(log);
            const data = await memberLog.create(log);

            return res.json(data);
        } catch (error) {
            console.error('Error fetching users:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    deleteLog: async function deleteLog(req, res) {
        try {
            const data = await memberLog.deleteOne({ "nickname": req.params.nickname });
            return res.json(data);
        } catch (error) {
            console.error('Error fetching users:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

module.exports = pastModel;
