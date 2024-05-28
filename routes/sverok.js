const express = require('express');
const router = express.Router();
const sverokModel = require('../models/sverok');

router.post('/', (req, res) => sverokModel.createMember(req, res));

module.exports = router;