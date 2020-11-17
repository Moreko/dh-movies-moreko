var express = require('express');
var router = express.Router();

const moviesController = require("../controllers/moviesController")

router.get('/', moviesController.list);

router.get('/new', moviesController.new);

router.get('/recomendadas', moviesController.recomendadas);

router.post('/search', moviesController.search);

router.get('/createForm', moviesController.createForm);

router.post('/create', moviesController.store);

router.get('/editForm/:id', moviesController.editForm);

router.post('/update/:id', moviesController.update);

router.post('/delete/:id', moviesController.delete);

router.get('/genero/:id', moviesController.detalleGenero);

router.get('/actor/:id', moviesController.detalleActor);

router.get('/:id', moviesController.detail);




module.exports = router;
