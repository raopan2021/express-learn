const db = require("../db/index");

// 查询所有考勤记录
exports.attendanceList = (req,res) => {
  const sql = `
    select
      a.time,
      user.account,
      user.name,
      user.age,
      user.sex,
      user.phone,
      user.level 
    from
      attendance as a
      left join user on a.account = user.account;
  `;
  db.query(sql,(err,results) => {
    console.log(results);
    if (err) return res.status(400).json(err);
    res.json({
      status: 200,
      results,
    });
  });
};

// 根据用户账号account来查询用户的考勤记录
exports.getAttendanceListByAccount = (req,res) => {
  if (!req.body.account) return res.status(400).json("请求体中无账号account");
  const sql = `
    select
      * 
    from
      attendance as a 
    where
      a.account = ?;
  `;
  db.query(sql,req.body.account,(err,results) => {
    console.log(results);
    if (err) return res.status(400).json(err);
    res.json({
      status: 200,
      results,
    });
  });
};