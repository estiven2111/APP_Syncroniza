const {Router} = require("express")
const ProyectRouter = Router()
const {proyect,componet,getComponet,activity} = require("../middlewares/proyect")

ProyectRouter.post("/",proyect)
ProyectRouter.post("/com",componet)
ProyectRouter.get("/com",getComponet)
ProyectRouter.post("/act",activity)


module.exports = ProyectRouter;