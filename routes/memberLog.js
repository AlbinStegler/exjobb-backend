const express = require('express');
const router = express.Router();
const memberLog = require('../models/memberLog');

router.get('/', (req, res) => memberLog.getLatest(req, res));
router.get('/all', (req, res) => memberLog.getAll(req, res));
router.post('/', (req, res) => memberLog.createLog(req, res));
router.delete('/:nickname', (req, res) => memberLog.deleteLog(req, res));
router.get('/today', (req, res) => memberLog.getToday(req, res));

module.exports = router;