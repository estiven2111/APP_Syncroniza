const {Router} = require("express");
const {login} = require("../middlewares/index");
const {authUpload, uploadFiles} = require("../middlewares/uploadFiles")
const userRouter = Router()

userRouter.post("/api/login",login)
userRouter.get("/api/files", authUpload)
userRouter.get("/api/callback", uploadFiles)

// userRouter.post("/api/register",registerUser)


  module.exports = userRouter