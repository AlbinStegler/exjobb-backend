const express = require('express');
const router = express.Router();
const admin = require('../models/admin');
/* GET users listing. */
router.post('/', (req, res) => admin.checkCredentials(req, res));
router.post('/', (req, res) => admin.createAdmin(req, res));

module.exports = router;
