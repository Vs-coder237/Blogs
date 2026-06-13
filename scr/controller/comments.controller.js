import prisma from "../lib/prisma.js";
import { HttpCode } from "../core/constants/index.js";
import { v4 as uuidv4 } from "uuid";
import httpCode from "../constants/index.js";



const commentController = {
    createComment: async(req, res)=>{
            try {
                const {content, blogId} = req.body
                const userId = req.Users.id

                if (!content || !blogId) {
                    return res.status(HttpCode.BAD_REQUEST).json({message: "Le contenu et l'id du blog sont requis"})
                }

                const blogExit = await prisma.blogs.findUnique({where: {id: blogId}})
                if (!blogExit) {
                    return res.status(HttpCode.NOT_FOUND).json({message: "Blog not found"})
                }

                const newComment = await prisma.Comment.create({
                    data:{
                        id: uuidv4(),
                        content,
                        blogId,
                        userId: userId
                    },
                    include: {
                        Users: {select: {name:true, role: true}}
                    }
                })

                return res.status(HttpCode.CREATED).json({message: "have successfully commented", newComment})

            } catch (error) {
                return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({error: 'erreur serveur'})
            }
    },
    
    getCommentById: async (req, res) => {
        try {
            const {id} = req.params

            const commentExist = prisma.comment.findUnique({where: {id}})

            if (!commentExist) {
                return res.status(httpCode.NOT_FOUND).json({message: 'this comment does not exist'})
            }

            return res.status(httpCode.OK).json(commentExist)
            
        } catch (error) {
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({error: 'erreur serveur'})
        }
    }

}

export default commentController