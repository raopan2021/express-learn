const db = require("../db/index");

exports.attendanceList = (req,res) => {
  const sql = "select * from attendance";
  db.query(sql,(err,results) => {
    console.log(results);
    if (err) return res.status(400).json(err);
    res.json({
      status: 200,
      results,
    });
  });
};
