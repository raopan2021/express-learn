const db = require("../db/index");

// 查询所有加班记录
exports.overtimeList = (req,res) => {
  const sql = `
    select
      e.createtime,
      e.planstarttime,
      e.endtime,
      user.account,
      user.name,
      user.age,
      user.sex,
      user.phone,
      user.level 
    from
      overtime as e
      left join user on e.account = user.account
      order by e.createtime desc;
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

// // 查询用户的月度加班记录
// exports.getUserEvectionByYearMonth = (req,res) => {
//   if (!req.body.account) return res.status(400).json("请求体中无账号account");
//   const account = req.body.account,
//     year = req.body.year,
//     month = req.body.month;
//   const sql = `
//     select
//       * 
//     from
//       evection as a 
//     where
//       account = ?
//       and year ( time )= ?
//       and month ( time )= ?
//     order by
//       a.time;
//   `;
//   db.query(sql,[account,year,month],(err,results) => {
//     console.log(results);
//     if (err) return res.status(400).json(err);
//     res.json({
//       status: 200,
//       results,
//     });
//   });
// };

// 查询用户的加班记录分页
exports.getUserOvertimeList = (req,res) => {
  let account = ''
  if (req.body.account) account = req.body.account
  let searchUserName = ''
  if (req.body.searchUserName) searchUserName = req.body.searchUserName
  const pageSize = req.body.pageSize;
  // 从第n条开始
  const start = (req.body.currentPage - 1) * pageSize;
  let tableSql = `
    select
      * , (TIMESTAMPDIFF(minute,planstarttime,endtime) / 60) as hour
    from
      overtime`
  if (account) {
    tableSql += ` where account = '${account}'`
  }
  if (searchUserName != '') {
    if (account) {
      tableSql += ` and where username like "%${searchUserName}%"`
    } else {
      tableSql += ` where username like "%${searchUserName}%"`
    }
  }
  tableSql += ` order by createtime desc
    limit ${start} , ${pageSize} ;
  `;

  console.log(tableSql);

  let totalSql = ` select count(*) as total from overtime `;
  if (account != '') {
    totalSql += ` where account = '${account}' ; `;
  }

  console.log(totalSql);


  db.query(tableSql,(err,tableResults) => {
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