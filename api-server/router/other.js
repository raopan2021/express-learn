const { urlencoded } = require('express');
const express = require('express');
const router = express.Router();

const otherHandler = require('../router_handler/other');
router.get('/holiday',otherHandler.holiday);

module.exports = router;