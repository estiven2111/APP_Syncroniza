const { DataTypes} = require("sequelize")

module.exports = (sequelize) =>{
    sequelize.define("Componet",{
        id:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true,
        },
        componet:{
            type:DataTypes.STRING,
            allowNull: true,
        }
    })
}