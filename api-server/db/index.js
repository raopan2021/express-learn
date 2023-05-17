const mysql = require('mysql');

db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',  // 这里使用自己数据库的密码
    database: 'wms',
    timezone: "08:00",  // 在原来基础上增加这一行，将标准时间转为北京时间
})

module.exports = db