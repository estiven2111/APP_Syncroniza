const { Router } = require("express");
const ProyectRouter = Router();
const {
  getProyectName,
  getProyect,
  registerActivities,
  hourActivities,
  logout,
} = require("../middlewares/index");

ProyectRouter.get("/search", getProyectName);
ProyectRouter.get("/", getProyect);
ProyectRouter.get("/logout", logout);
ProyectRouter.post("/hours", registerActivities);
ProyectRouter.get("/hours", hourActivities);

module.exports = ProyectRouter;
