import Authentication from "../controller/users.controller.js";
import { Router } from "express";

const userRouter = Router()

userRouter.post("/", Authentication.signUp)

export default userRouter