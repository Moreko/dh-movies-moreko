var express = require('express');
var router = express.Router();

const moviesController = require("../controllers/moviesController")


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {title: "Práctica DH Movies Mysql Juan"});  
},);


module.exports = router;
