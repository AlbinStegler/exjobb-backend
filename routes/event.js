const express = require('express');
const router = express.Router();
const eventModel = require('../models/event');
/* GET users listing. */
router.get('/', (req, res) => eventModel.getEvents(req, res));
router.get('/active', (req, res) => eventModel.getActiveEvent(req, res));
router.post('/', (req, res) => eventModel.addEvent(req, res));
router.put('/book', (req, res) => eventModel.bookSeat(req, res));
router.put('/cancel', (req, res) => eventModel.unbookSeat(req, res));
router.put('/', (req, res) => eventModel.activateEvent(req, res));
router.delete('/:id', (req, res) => eventModel.deleteEvent(req, res));
module.exports = router;
