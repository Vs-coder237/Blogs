import userManagement from "../controller/users.controller.js";
import { Router } from "express";

const userRouter = Router()

userRouter.post("/", userManagement.createUser)

export default userRouter