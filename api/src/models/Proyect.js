const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
    sequelize.define("Proyect", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      proyect: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
     });
}