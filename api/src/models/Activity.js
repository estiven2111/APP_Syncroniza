const { DataTypes} = require("sequelize")

module.exports = (sequelize) =>{
    sequelize.define("Activity",{
        id:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true,
        },
        activity:{
            type:DataTypes.STRING,
            allowNull: true,
        },
        description:{
            type:DataTypes.STRING,
            allowNull: true,
        }
    })
}