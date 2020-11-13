const {sequelize, DataTypes} = require("sequelize")
const moviesController = require("../../controllers/moviesController")

module.exports = (sequelize, DataTypes) => {
    const Peliculas = sequelize.define("Movie", {
        title: DataTypes.STRING,
        rating: DataTypes.DECIMAL,
        awards: DataTypes.INTEGER,
        release_date: DataTypes.DATEONLY,
        length: DataTypes.INTEGER,
        genre_id: DataTypes.INTEGER
    })
    Peliculas.associate = models=>{
        Peliculas.belongsTo(models.Genre);
    }
    
    return Peliculas
}