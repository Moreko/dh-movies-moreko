const {sequelize, DataTypes} = require("sequelize")
const moviesController = require("../../controllers/moviesController")
const moment = require("moment")
moment().format(); 

module.exports = (sequelize, DataTypes) => {
    const Peliculas = sequelize.define("Movie", {
        title: DataTypes.STRING,
        rating: DataTypes.DECIMAL,
        awards: DataTypes.INTEGER,
        release_date: {type: DataTypes.DATEONLY,get() {
            return moment(this.getDataValue('release_date')).add(3, 'hours').format('DD-MM-YYYY')}
        },
        length: DataTypes.INTEGER,
        genre_id: DataTypes.INTEGER
    })
    Peliculas.associate = models=>{
        Peliculas.belongsTo(models.Genre);
        Peliculas.belongsToMany(models.Actor, {
            as:"actores",
            through:"actor_movie"
        }); 

    }

    
    return Peliculas
}