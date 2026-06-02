import blogs from "../controller/blogs.controller.js"
import Router from 'express'

const router = Router()

router.post('/', blogs.create)
router.get('/', blogs.readAll)
router.get('/:id', blogs.findBlogById)
router.put('/:id', blogs.Update)
router.delete('/:id', blogs.Delete)

export default router

