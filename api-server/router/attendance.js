const { urlencoded } = require('express');
const express = require('express');
const router = express.Router();

const attendanceHandler = require('../router_handler/attendance')
router.get('/attendanceList',attendanceHandler.attendanceList)
router.post('/getAttendanceListByAccount',attendanceHandler.getAttendanceListByAccount)

// router.get('/list', userHandler.list)
// router.post('/add', userHandler.add)
// router.post('/mod/:id', userHandler.mod)
// router.post('/delete/:id', userHandler.delete)
// router.post('/searchByName', userHandler.searchByName)

// router.get('/checkCode', userHandler.checkCode)
// router.post('/login', userHandler.login)

module.exports = router