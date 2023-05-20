const { urlencoded } = require('express');
const express = require('express');
const router = express.Router();

const attendanceHandler = require('../router_handler/attendance');
router.post('/attendanceList',attendanceHandler.attendanceList);
router.post('/getUserAttendanceByYearMonth',attendanceHandler.getUserAttendanceByYearMonth);
router.post('/getUserAttendanceList',attendanceHandler.getUserAttendanceList);

module.exports = router;