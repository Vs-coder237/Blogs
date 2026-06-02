import blogs from "../controller/blogs.controller.js"
import Router from 'express'

const router = Router()

router.post('/', blogs.create)
router.get('/', blogs.readAll)
router.get('/:id', blogs.findBlogById)
router.get('/:id', blogs.Update)
router.get('/:id', blogs.Delete)

export default router

