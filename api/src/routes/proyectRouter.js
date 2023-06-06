const { Router } = require("express");
const ProyectRouter = Router();
const {
  getProyectName,
  getProyect,
  logout
} = require("../middlewares/index");

ProyectRouter.get("/search", getProyectName);
ProyectRouter.get("/", getProyect);
ProyectRouter.get("/logout",logout)

module.exports = ProyectRouter;
