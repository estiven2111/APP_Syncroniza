// const mongoose = require('mongoose');

// // Conectar a MongoDB
// mongoose.connect('mongodb://localhost:27017/myapp', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => {
//     console.log('Conexión exitosa a MongoDB');
//   })
//   .catch((error) => {
//     console.error('Error al conectar a MongoDB:', error);
//   });

  const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
// require("dotenv").config();

// const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME,DB_PORT } = process.env;
//port 5432
// const sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
//   { logging: false }
// );
// const sequelize = new Sequelize(
//   `postgres://postgres:E1020@localhost/Syncroniza`,
//   { logging: false }
// ); PC-GAMER-ESTIVE
const sequelize = new Sequelize('Fritomania', 'estiven2111_SQLLogin_1', 'lxsl4f4uji', {
  host: 'Fritomania.mssql.somee.com',
  dialect: 'mssql', /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
port:"1433"
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);
 const { User, Proyect, Componet, Activity } = sequelize.models;

//  Component.belongsToMany(Proyect,{through:"proyectComponet"}) // ? un componente tiene muchos proyectos
//  Proyect.belongsToMany(Component,{through:"proyectComponet"}) //? un proyecto tiene muchos componentes

Proyect.hasMany(Componet) // ? un proyecto tiene muchos componetes
Componet.belongsTo(Proyect) //? un componente tiene un proyecto

Componet.hasMany(Activity) // ? un Componet tiene muchos Activity
Activity.belongsTo(Componet) //? un Activity tiene un Componet



module.exports = {
  ...sequelize.models,
  sequelize,
};
