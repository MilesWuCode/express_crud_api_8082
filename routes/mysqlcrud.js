var express = require('express');
var router = express.Router();

var secret = require('../private/secret');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: secret.host,
  user: secret.user,
  password: secret.password,
  database: secret.database
});

// connection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }

//   console.log('connected as id ' + connection.threadId);
// });

router.get('/:num?', function (req, res, next) {
  num = req.params.num;

  if (!num) {
    num = 100;
  } else {
    num = parseInt(req.params.num);
  }

  connection.query('SELECT * FROM mysqlcrud limit 0,?', [num], function (err, rows, fields) {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

module.exports = router;