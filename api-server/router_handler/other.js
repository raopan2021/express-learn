const db = require("../db/index");

// 查询月度的节假日工作日情况
exports.holiday = (req,res) => {
  // let month = req.body.month;
  let month = req.body.yearmonth;
  let app_id = "pkukuhqqlfpqomgk";
  let app_secret = "aGVyalNCdFQ5c2JDamVudWVYVXkyZz09";

  const axios = require('axios');
  //外站接口
  const api = `https://www.mxnzp.com/api/holiday/list/month/${month}?ignoreHoliday=false&app_id=${app_id}&app_secret=${app_secret}`;
  console.log(api);
  let results = null;
  axios.get(api)
    .then(function(response) {
      results = response.data.data
    })
    .catch(function(error) {
      results = error
    })
    .finally(() => {
      res.send({
        status: 200,
        results: results
      });
    })
};
