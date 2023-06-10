const { Router } = require("express");
const ProyectRouter = Router();
const {
  getProyectName,
  getProyect,
  registerActivities,
  logout
} = require("../middlewares/index");

ProyectRouter.get("/search", getProyectName);
ProyectRouter.get("/", getProyect);
ProyectRouter.get("/logout",logout);
ProyectRouter.post("/",registerActivities);

module.exports = ProyectRouter;
