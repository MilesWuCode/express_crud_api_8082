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

router.get('/list/:num?', function (req, res) {
  num = req.params.num;

  if (!num) {
    num = 100;
  } else {
    num = parseInt(req.params.num);
  }

  connection.query('SELECT * FROM mysqlcrud limit 0,?', [num], function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

router.get('/:id', function (req, res) {
  id = parseInt(req.params.id);
  connection.query('SELECT * FROM mysqlcrud WHERE id = ?', [id], function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

router.post('/', function (req, res) {
  console.log(req.body);
  data = {
    name: req.body.name,
    content: req.body.content
  };
  connection.query('INSERT INTO mysqlcrud SET ?', data, function (err, result) {
    if (err) throw err;
    connection.query('SELECT * FROM mysqlcrud WHERE id = ?', [result.insertId], function (err, rows, fields) {
      if (err) throw err;
      res.json(rows[0]);
    });
  });
});

router.put('/:id', function (req, res) {
  id = parseInt(req.params.id);
  data = req.body;
  connection.query('UPDATE mysqlcrud SET ? WHERE id = ?', [
    data, id
  ], function (err, result) {
    if (err) throw err;
    res.json(req.params);
  });
});

router.delete('/:id', function (req, res) {
  id = parseInt(req.params.id);
  connection.query('DELETE FROM mysqlcrud WHERE id = ?', [id], function (err, result) {
    if (err) throw err;
    res.json(req.params);
  });
});

module.exports = router;