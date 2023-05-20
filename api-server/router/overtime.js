const { urlencoded } = require('express');
const express = require('express');
const router = express.Router();

const overtimeHandler = require('../router_handler/overtime');
router.get('/overtimeList',overtimeHandler.overtimeList);
router.post('/getUserOvertimeList',overtimeHandler.getUserOvertimeList);

module.exports = router;