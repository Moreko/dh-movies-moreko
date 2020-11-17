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
        let peliculas = await Movie.findAll();
        res.render("creacionExitosa", {peliculas, newMovie})
    } 

}