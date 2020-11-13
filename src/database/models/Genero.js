const {sequelize, DataTypes} = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    const Generos = sequelize.define("Genre", {
        name: DataTypes.STRING,
        ranking: DataTypes.INTEGER,
        active: DataTypes.INTEGER
    });
        Generos.associate = models=>{
            Generos.hasMany(models.Movie);
        }

    return Generos
}