const db = require("../db/index");

// 查询所有考勤记录
exports.attendanceList = (req,res) => {
  const currentPage = req.body.currentPage,
    pageSize = req.body.pageSize;
  // 从第n条开始
  const start = (currentPage - 1) * pageSize;
  const tableSql = `
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
      left join user on a.account = user.account
      order by a.time desc
    limit ? , ? ;
  `;
  const totalSql = `
    select
      count(*) as total
    from
      attendance ; 
    `;
  db.query(tableSql,[start,pageSize],(err,tableResults) => {
    if (err) return res.status(400).json(err);
    db.query(totalSql,(err,totalResults) => {
      if (err) return res.status(400).json(err);
      res.json({
        status: 200,
        results: tableResults,
        total: totalResults[0].total
      });
    });
  });
};

// 查询用户的月度考勤记录
exports.getUserAttendanceByYearMonth = (req,res) => {
  if (!req.body.account) return res.status(400).json("请求体中无账号account");
  const account = req.body.account,
    year = req.body.year,
    month = req.body.month;
  const sql = `
    select
      sql_calc_found_rows * 
    from
      attendance as a 
    where
      account = ?
      and year ( time )= ?
      and month ( time )= ?
    order by
      a.time;
  `;
  db.query(sql,[account,year,month],(err,results) => {
    if (err) return res.status(400).json(err);
    res.json({
      status: 200,
      results,
    });
  });
};

// 查询用户的考勤记录分页
exports.getUserAttendanceList = (req,res) => {
  if (!req.body.account) return res.status(400).json("请求体中无账号account");
  const account = req.body.account,
    currentPage = req.body.currentPage,
    pageSize = req.body.pageSize;
  // 从第n条开始
  const start = (currentPage - 1) * pageSize;
  const tableSql = `
    select
      * 
    from
      attendance
    where
      account = ?
    order by
      time desc
    limit ? , ? ;
  `;
  const totalSql = `
    select
      count(*) as total
    from
      attendance 
    where
      account = ? ;
  `;
  db.query(tableSql,[account,start,pageSize],(err,tableResults) => {
    if (err) return res.status(400).json(err);
    db.query(totalSql,[account],(err,totalResults) => {
      if (err) return res.status(400).json(err);
      res.json({
        status: 200,
        results: tableResults,
        total: totalResults[0].total
      });
    });
  });
};

// 查询用户今天的考勤
exports.getUserTodayAttendance = (req,res) => {
  if (!req.body.account) return res.status(400).json("请求体中无账号account");
  const account = req.body.account;
  const sql = `
    select * from attendance 
    where account = "${account}" 
    and TO_DAYS( time ) = TO_DAYS(NOW()) 
    order by time
  `;
  console.log(sql);
  db.query(sql,(err,tableResults) => {
    if (err) return res.status(400).json(err);
    res.json({
      status: 200,
      results: tableResults,
    });
  });
};

// 向第三方api获取节假日