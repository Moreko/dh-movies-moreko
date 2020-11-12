const fs = require('fs');
const path = require('path');
let db = require("../database/models")


module.exports = {
    list: (req, res, next) => {
        db.Peliculas.findAll()
         .then(function(peliculas){
          res.render('peliculas', {peliculas});
         }).catch(function(error) {
          res.render("error", {message: "Esta es la vista de error"})
         })
      },

    detail: (req, res, next) => {
        db.Peliculas.findByPk(req.params.id)
            .then(function(pelicula) {
                res.render("detallePelicula", {pelicula})
     })
    },

    new: (req, res, next) => {
        db.Peliculas.findAll({
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
        db.Peliculas.findAll({
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
        db.Peliculas.findAll({
            where: {
                title: { [db.Sequelize.Op.like] : "%" + req.body.busqueda + "%" }
            }
        })
            .then(function(busqueda) {
                res.render("peliculasEncontradas", {busqueda})
     })
    }    

}