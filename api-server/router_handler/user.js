const db = require("../db/index");
const svgCaptcha = require("svg-captcha");
const config = require("../config");
const jwt = require("jsonwebtoken");

exports.list = (req,res) => {
  const searchUserName = req.body.searchUserName,
    searchUserLevel = req.body.searchUserLevel,
    currentPage = req.body.currentPage,
    pageSize = req.body.pageSize;
  // 从第n条开始
  const start = (currentPage - 1) * pageSize;

  // 查询表格的sl
  let tableSql = ` select * from user `
  if (searchUserName != '') {
    tableSql += `where name like "%${searchUserName}%" `
  }
  if (searchUserLevel != '') {
    if (searchUserName != '') {
      tableSql += `and where level = "${searchUserLevel}"`
    } else {
      tableSql += `where level = "${searchUserLevel}"`
    }
  }
  tableSql += ` order by name desc limit ${start} , ${pageSize} ;`;
  console.log(tableSql);

  // 查询总数的sql
  const totalSql = ` select count(*) as total from user; `;

  db.query(tableSql,(err,tableResults) => {
    if (err) return res.status(400).json(err);
    db.query(totalSql,(err,TotalResults) => {
      if (err) return res.status(400).json(err);
      res.json({
        status: 200,
        results: tableResults,
        total: TotalResults[0].total
      });
    });
  });
};

exports.add = (req,res) => {
  const user = req.body;
  const searchSql = "select * from user where account = ?";
  db.query(searchSql,user.account,(err,results) => {
    if (results.length !== 0) {
      return res.status(400).json("账号已存在，请更换账号");
    } else {
      const sql = "insert into user set ?";
      db.query(sql,user,(err,results) => {
        if (err) return res.status(400).json(err);
        res.json({
          status: 200,
          result: user,
        });
      });
    }
  });
};

exports.mod = (req,res) => {
  const user = req.body;
  const sql = "update user set ? where id = ?";
  db.query(sql,[user,req.params.id],(err,result) => {
    if (err) return res.status(400).json(err);
    if (result.affectedRows !== 1) return res.status(400).json("添加失败");
    res.json({
      status: 200,
      result: user,
    });
  });
};

exports.delete = (req,res) => {
  const sql = "delete from user where id = ?";
  db.query(sql,req.params.id,(err,result) => {
    if (err) return res.status(400).json(err);
    if (result.affectedRows !== 1) return res.status(400).json("删除失败");
    res.status(200).json("删除成功");
  });
};

// 根据姓名查询用户信息
exports.searchByName = (req,res) => {
  const name = req.body.name;
  if (!name) return res.status(400).json("请求体中无name");
  const seachParam = "%" + name + "%";
  const sql = "select * from user where name like ?";
  db.query(sql,seachParam,(err,results) => {
    if (err) return res.status(400).json(err);
    res.json({
      status: 200,
      results,
    });
  });
};

// 登录相关
// 验证码
exports.checkCode = (req,res) => {
  const img = svgCaptcha.create({
    size: 4,
    ignoreChars: "0o1l",
    color: true,
    noise: 2,
    background: "#FFF0F5",
    height: 38,
    width: 113,
  });
  res.send(img);
};

// 登录
exports.login = (req,res) => {
  const user = req.body;
  console.log(user);
  const sql = "select * from user where account = ?";
  db.query(sql,user.account,(err,results) => {
    console.log(results);
    if (err) return res.status(400).json(err);
    if (results.length !== 1) return res.status(400).json("用户不存在");
    if (results[0].password != user.password)
      return res.status(400).json("用户名或密码错误，请重新输入");

    const user_info = {
      id: results[0].id,
      account: results[0].account,
      name: results[0].name,
    };
    const tokenStr = jwt.sign(user_info,config.jwtSecretKey,{
      expiresIn: "10h",
    });
    res.json({
      status: 200,
      message: "登录成功",
      token: "Bearer " + tokenStr,
    });
  });
};
