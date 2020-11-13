const {sequelize, DataTypes} = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    const Actores = sequelize.define("Actores", {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        rating: DataTypes.INTEGER,
        favorite_movie_id: DataTypes.INTEGER
    },{
        tableName: "actors",
        timestamps: false
    })
    return Actores
}