const { urlencoded } = require('express');
const express = require('express');
const router = express.Router();

const evectionHandler = require('../router_handler/evection');
router.get('/evectionList',evectionHandler.evectionList);
// router.post('/getUserEvectionByYearMonth',evectionHandler.getUserEvectionByYearMonth);
router.post('/getUserEvectionList',evectionHandler.getUserEvectionList);

module.exports = router;