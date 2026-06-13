import { Router } from "express";
import commentController from "../controller/comments.controller";

const commentRouter = Router()

commentRouter.post('/', commentController.createComment)
commentRouter.get('/:id', commentController.getCommentById)

export default commentRouter