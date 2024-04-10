const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
/* GET users listing. */
router.get('/', (req, res) => userModel.getUsers(req, res));
router.get('/event/:id', (req, res) => userModel.getUsersByEvent(req, res));
router.post('/', (req, res) => userModel.addUser(req, res));
router.put('/', (req, res) => userModel.updateUser(req, res));
router.post('/seat', (req, res) => userModel.getUserFromSeat(req, res));
router.delete('/:id', (req, res) => userModel.deleteUser(req, res));

module.exports = router;
