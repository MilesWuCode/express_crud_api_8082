var express = require('express');
var router = express.Router();
var app = express();

var jwt = require('express-jwt');
var cors = require('cors');

app.use(cors());

/* jwt */
const authCheck = jwt({
  secret: new Buffer('4sWb04c_GWVecueOBk3LuJkVVKOmfu_jYZtqEO5I4Gcfx1tjH_3w-e2aJh1mJ4xB', 'base64'), //YOUR-AUTH0-SECRET
  audience: 'ihdxLCuOMPD7Cm8Bv3tyWU2Nnpw7cHtR' //YOUR-AUTH0-CLIENT-ID
});

router.get('/', function(req, res, next) {
  res.json([
    'a','b','c'
  ]);
});

router.get('/private', authCheck, function(req, res, next) {
  res.json([
    'a','b','c'
  ]);
});

module.exports = router;
