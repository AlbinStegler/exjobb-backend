const express = require('express');
const router = express.Router();
const userModel = require('../models/past');
/* GET users listing. */
router.get('/', (req, res) => userModel.getPast(req, res));

module.exports = router;
