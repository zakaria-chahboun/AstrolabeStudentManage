var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Astrolabe Group Corporation' , name:'zakaria chahboun'.toUpperCase()});
  
});

module.exports = router;
