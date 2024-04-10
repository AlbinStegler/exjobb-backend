const { database, past } = require('../database/database.js');
const ObjectId = require('mongodb').ObjectId;

const pastModel = {
    getPast: async function getPast(req, res) {
        try {
            const data = await past.find();
            return res.json(data);
        } catch (error) {
            console.error('Error fetching users:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

module.exports = pastModel;