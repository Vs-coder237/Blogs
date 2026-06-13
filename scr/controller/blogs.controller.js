import httpCode from "../constants/index.js"
import prisma from "../lib/prisma.js"
import {v4 as uuidv4} from "uuid"

const blogs = {
    create: async (req, res) => {
        try {
            const {Author, Title, Description} = req.body
            if (!Author || !Title || !Description) {
                return res.status(httpCode.BAD_REQUEST).json({error: "Enter all fields"})
            }
            const blog = await prisma.blogs.create({
                data: {
                    id: uuidv4(),
                    Author,
                    Title,
                    Description
                }
            })
            
            if (!blog) {
                res.status(httpCode.NO_CONTENT).json({error: 'error'})
            }
            return res.status(httpCode.CREATED).json({message: 'The blog has been created succesfully', blog})

        } catch (error) {
            res.status(httpCode.INTERNAL_SERVER_ERROR).json({error: 'server error'})
        }
    },

    readAll: async (req, res) => {
        try {
            const blog = await prisma.blogs.findMany({
                orderBy: {postAt: 'desc'}
            })
            if (!blog){
                return res.status(httpCode.NOT_FOUND).json({message: 'No blog found'})
            }
            return res.status(httpCode.OK).json(blog)
        } catch (error) {
            res.status(httpCode.INTERNAL_SERVER_ERROR).json({error: 'server error'})
        }
    },

    findBlogById: async (req, res) => {
        try {
            const {id} = req.params
            const blog = await prisma.blogs.findUnique({
                where: {id}
            })
            if (!blog) {
                return res.status(httpCode.NOT_FOUND).json({message: 'no blog found'})
            }
            return res.status(httpCode.OK).json(blog)
        } catch (error) {
            return res.send(httpCode.INTERNAL_SERVER_ERROR).json({error: 'server error'})
        }
    },

    Update: async (req, res) => {
        try {
            const {id} = req.params
            const {Author, Title, Description} = req.body

            const exist = await prisma.blogs.findUnique({
                where: {id}
            })

            if (!exist) {
                return res.status(httpCode.NOT_FOUND).json({message: 'blog not found'})
            }

            const updateBlog = await prisma.blogs.update({
                where: {id},
                data: {
                    Author: Author ?? exist.Author,
                    Title: Title ?? exist.Title,
                    Description: Description ?? exist.Description
                }
            })

            return res.status(httpCode.OK).json({message: 'Blog updated succesfully', updateBlog})
        } catch (error) {
            return res.send(httpCode.INTERNAL_SERVER_ERROR).json({error: 'server error'})
        }
    },

    Delete: async (req, res) => {
        try {
            const {id} = req.params

            const exist = await prisma.blogs.findUnique({
                where: {id}
            })

            if (!exist) {
                return res.status(httpCode.NOT_FOUND).json({message: 'blog not found'})
            }

            await prisma.blogs.delete({
                where: {id}
            })

            return res.status(HttpCode.OK).json({message: 'successfully deleted the blog'})

        } catch (error) {
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ error: "Erreur lors de la mise à jour du blog"})
        }
    }

}

export default blogs