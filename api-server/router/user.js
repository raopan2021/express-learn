const { urlencoded } = require('express');
const express = require('express');
const router = express.Router();

const userHandler = require('../router_handler/user.js');
router.post('/list',userHandler.list);
router.post('/add',userHandler.add);
router.post('/mod/:id',userHandler.mod);
router.post('/delete/:id',userHandler.delete);
router.post('/searchByName',userHandler.searchByName);

router.get('/checkCode',userHandler.checkCode);
router.post('/login',userHandler.login);

module.exports = router;