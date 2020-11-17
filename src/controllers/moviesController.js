const fs = require('fs');
const path = require('path');
let db = require("../database/models")
const {Movie, Genre, Actor} = require("../database/models")

// {include:{all:true}}

module.exports = {
    list: (req, res, next) => {
        db.Movie.findAll({include:{all:true}})
         .then(function(peliculas){
          res.render('peliculas', {peliculas});
         }).catch(function(error) {
          res.render("error", {message: error})
         })
      },

    detail: (req, res, next) => {
        db.Movie.findByPk(req.params.id)
            .then(function(pelicula) {
                res.render("detallePelicula", {pelicula})
     })
    },

    new: (req, res, next) => {
        db.Movie.findAll({
            order: [
                ["release_date", "DESC"]
            ],
            limit:5
        })
            .then(function(estrenos) {
                res.render("estrenos", {estrenos})
     })
    },

    recomendadas: (req, res, next) => {
        db.Movie.findAll({
            where: {
                rating: { [db.Sequelize.Op.gte]:8 }
            },
            order: [
                ["rating", "DESC"]
            ],
        })
            .then(function(recomendadas) {
                res.render("recomendadas", {recomendadas})
     })
    },

    search: (req, res, next) => {
        db.Movie.findAll({
            where: {
                title: { [db.Sequelize.Op.like] : "%" + req.body.busqueda + "%" }
            }
        })
            .then(function(busqueda) {
                res.render("peliculasEncontradas", {busqueda})
     })
    },

    createForm: async (req,res) => {
        const generos = await Genre.findAll();
        const actores = await Actor.findAll();
        res.render("createForm", {generos, actores})
    },

    store: async (req,res,next) => {
        const newMovie = await Movie.create(req.body)
        await newMovie.addActores(req.body.actores)
        let peliculas = await Movie.findAll({include:{all:true}});
        res.render("creacionExitosa", {peliculas, newMovie})
        // res.send(peliculas)
    },

    editForm: async (req,res,next) => {
        let peliculaParaEditar = await Movie.findByPk(req.params.id, {include:{all:true}})
        const generos = await Genre.findAll();
        const actores = await Actor.findAll();
        res.render("editForm",{peliculaParaEditar, generos, actores})
    },

    update: async (req,res,next) => {
        let peliculaParaEditar = await Movie.findByPk(req.params.id, {include:{all:true}})
        await peliculaParaEditar.removeActores(peliculaParaEditar.actores)
        await peliculaParaEditar.addActores(req.body.actores)
        await peliculaParaEditar.update(req.body)
        res.render("edicionExitosa", {peliculaParaEditar})
    },

    delete: async (req,res,next) => {
        let peliculaParaBorrar = await Movie.findByPk(req.params.id, {include:{all:true}})
        await peliculaParaBorrar.destroy({
            where: {
                id: req.params.id
            }
        })
        res.render("borradoExitoso", {peliculaParaBorrar})
    }
}