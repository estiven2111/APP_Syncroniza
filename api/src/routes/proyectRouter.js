const { Router } = require("express");
const ProyectRouter = Router();
const {
  proyect,
  componet,
  getComponet,
  activity,
  getProyectName,
} = require("../middlewares/index");

ProyectRouter.post("/", proyect);
ProyectRouter.post("/com", componet);
ProyectRouter.get("/com", getComponet);
ProyectRouter.post("/act", activity);
ProyectRouter.post("/search", getProyectName);

module.exports = ProyectRouter;
