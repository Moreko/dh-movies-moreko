const {sequelize, DataTypes} = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    const Peliculas = sequelize.define("Peliculas", {
        title: DataTypes.STRING,
        rating: DataTypes.DECIMAL,
        awards: DataTypes.INTEGER,
        release_date: DataTypes.DATEONLY,
        length: DataTypes.INTEGER
    },{
        tableName: "movies",
        timestamps: false
    })
    return Peliculas
}