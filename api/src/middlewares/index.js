const login = require("./login");
// const registerUser = require("./registerUser");
const {
  getProyectName,
  getProyect,
  registerActivities,
  logout
} = require("./proyect");

module.exports = {
  login,
  getProyectName,
  getProyect,
  registerActivities,
  logout
};
