var express = require('express');
var getContent = require("./../data/content");

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Employee Directory', employee_list: getContent().filter(emp => emp.id != -1) });
});

router.get('/create', function(req, res, next) {

  res.render('create', { title: 'Add to Employee Directory'});
});

module.exports = router;
