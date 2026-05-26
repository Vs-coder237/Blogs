import blogs from "../controller/blogs.controller.js"
import Router from 'express'

const router = Router()

router.post('/', blogs.create)

export default router

