const {Router} = require("express");
const {login,
  // registerUser
} = require("../middlewares/index")
const userRouter = Router()

userRouter.post("/api/login",login)

// userRouter.post("/api/register",registerUser)


  module.exports = userRouter