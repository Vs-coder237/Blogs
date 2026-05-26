import httpCode from "../../core/constants/index.js"
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
            return res.status(httpCode.OK).json(blogs)
        } catch (error) {
            res.status(httpCode.INTERNAL_SERVER_ERROR).json({error: 'server error'})
        }
    }

}

export default blogs