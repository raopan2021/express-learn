const db = require("../db/index");

// 查询所有出差记录
exports.evectionList = (req,res) => {
  const sql = `
    select
      e.createtime,
      e.starttime,
      e.endtime,
      user.account,
      user.name,
      user.age,
      user.sex,
      user.phone,
      user.level 
    from
      evection as e
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

// // 查询用户的月度出差记录
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

// 查询用户的出差记录分页
exports.getUserEvectionList = (req,res) => {
  console.log(req);
  if (!req.body.account) return res.status(400).json("请求体中无账号account");
  const account = req.body.account,
    currentPage = req.body.currentPage,
    pageSize = req.body.pageSize;
  // 从第n条开始
  const start = (currentPage - 1) * pageSize;
  const tableSql = `
    select
      * , (TIMESTAMPDIFF(day,starttime,endtime) + 1) as day
    from
      evection
    where
      account = ?
    order by
      createtime desc
    limit ? , ? ;
  `;
  const totalSql = `
    select
      count(*) as total
    from
      evection 
    where
      account = ? ;
  `;
  db.query(tableSql,[account,start,pageSize],(err,tableResults) => {
    if (err) return res.status(400).json(err);
    db.query(totalSql,[account],(err,TotalResults) => {
      if (err) return res.status(400).json(err);
      res.json({
        status: 200,
        results: tableResults,
        total: TotalResults[0].total
      });
    });
  });
};