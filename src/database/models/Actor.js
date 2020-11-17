const {sequelize, DataTypes} = require("sequelize")


module.exports = (sequelize, DataTypes) => {
    const Actores = sequelize.define("Actor", {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        rating: DataTypes.INTEGER,
        favorite_movie_id: DataTypes.INTEGER
    })

    // Actores.associate = models=>{
    //     Actores.belongsToMany(models.Movie);
    // }

    return Actores
}