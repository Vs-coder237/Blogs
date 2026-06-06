import Authentication from "../controller/users.controller.js";
import { Router } from "express";

const userRouter = Router()

userRouter.post("/", Authentication.signUp)
userRouter.get("/", Authentication.ReadAll)
userRouter.get('/:id', Authentication.findUserById)
userRouter.put('/:id', Authentication.updateUser)
userRouter.delete('/:id', Authentication.deleteUser)

export default userRouter