var express = require('express');
var router = express.Router();

const moviesController = require("../controllers/moviesController")

router.get('/', moviesController.list);

router.get('/new', moviesController.new);

router.get('/recomendadas', moviesController.recomendadas);

router.post('/search', moviesController.search);

router.get('/createForm', moviesController.createForm);

router.post('/create', moviesController.store);

// router.post('/delete/:id', moviesController.delete);

// router.get('/editForm/:id', moviesController.editForm);

// router.post('/edit/:id', moviesController.edit);

router.get('/:id', moviesController.detail);




module.exports = router;
