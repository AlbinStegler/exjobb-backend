const { database, admin } = require('../database/database.js');
const ObjectId = require('mongodb').ObjectId;

const adminModel = {
    checkCredentials: async function checkCredentials(req, res) {
        // Check if the username and password are correct
        try {
            const username = req.body.username;
            const password = req.body.password;
            const data = await admin.findOne({ username: username, password: password });
            if (data === null) {
                return res.json({ status: 401, message: 'Credentials are NOT correct' });
            }
            return res.json({ status: 200, message: 'Credentials are correct' });
        } catch (error) {
            console.error('Error fetching admins:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    // NO NEED TO CREATE ADMIN FROM FRONTEND AS IT IS A ONE TIME OPERATION

    // createAdmin: async function createAdmin(req, res) {
    //     // Assuming req.body contains the admin data in the expected format
    //     console.log('Admin data:', req.body);
    //     const adminData = req.body;
    //     try {
    //         // Insert the admin data into the database
    //         const result = await admin.create(adminData);
    //         console.log('Admin added:', req.body.username);
    //         // Return success response
    //         return res.json({ message: 'Admin added', insertedId: result.insertedId });
    //     } catch (error) {
    //         console.error('Error adding admin:', error);
    //         return res.status(500).json({ error: 'Internal Server Error' });
    //     }
    // }
};

module.exports = adminModel;