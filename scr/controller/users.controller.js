import httpCode from "../../core/constants/index.js"
import prisma from "../lib/prisma.js"
import {v4 as uuidv4} from "uuid"
import { mailFormat } from "../services/email.service.js"

const Authentication = {
    signUp: async (req, res) => {
        try {
            const {name, email, password, role} = req.body
            if (!name || !email || !password) {
                return res.status(httpCode.BAD_REQUEST).json({error: "Enter all fields"})
            }

            const emailExist = await prisma.Users.findUnique({
                where: {email}
            })

            if (emailExist) {
                res.send(httpCode.BAD_REQUEST).json({message: 'this email already exist'})
            }

            console.log("i love programming")
            const newUser = await prisma.Users.create({
                data: {
                    id: uuidv4(),
                    name,
                    email,
                    password,
                    role: role || "User"
                }
            })

            mailFormat.sendMessage(email, name)

            if (!newUser) {
                res.status(httpCode.NO_CONTENT).json({error: 'error'})
            }
            return res.status(httpCode.CREATED).json({message: 'The User has been created succesfully', newUser})

        } catch (error) {
            res.status(httpCode.INTERNAL_SERVER_ERROR).json({error: 'server error'})
        }
    },

    readAll: async (req, res) => {
        try {
            const user = await prisma.Users.findMany({
                orderBy: {postAt: 'desc'}
            })
            if (!user){
                return res.status(httpCode.NOT_FOUND).json({message: 'No users found'})
            }
            return res.status(httpCode.OK).json(user)
        } catch (error) {
            res.status(httpCode.INTERNAL_SERVER_ERROR).json({error: 'server error'})
        }
    },

    findBlogById: async (req, res) => {
        try {
            const {id} = req.params
            const user = await prisma.Users.findUnique({
                where: {id}
            })
            if (!user) {
                return res.status(httpCode.NOT_FOUND).json({message: 'no users found'})
            }
            return res.status(httpCode.OK).json(user)
        } catch (error) {
            return res.status(httpCode.INTERNAL_SERVER_ERROR).json({error: 'server error'})
        }
    },

    Update: async (req, res) => {
        try {
            const {id} = req.params
            const {name, email, password} = req.body

            const exist = await prisma.Users.findUnique({
                where: {id}
            })

            if (exist) {
                return res.status(httpCode.BAD_REQUEST).json({message: 'the email already exist'})
            }

            const updateUser = await prisma.blogs.update({
                where: {id},
                data: {
                    name: name ?? exist.name,
                    email: email ?? exist.email,
                    password: password ?? exist.password
                }
            })

            return res.status(httpCode.OK).json({message: 'User updated succesfully', updateUser})
        } catch (error) {
            return res.status(httpCode.INTERNAL_SERVER_ERROR).json({error: 'server error'})
        }
    },

    Delete: async (req, res) => {
        try {
            const {id} = req.params

            const exist = await prisma.Users.findUnique({
                where: {id}
            })

            if (!exist) {
                return res.status(httpCode.NOT_FOUND).json({message: 'blog not found'})
            }

            await prisma.Users.delete({
                where: {id}
            })

            return res.status(HttpCode.OK).json({message: 'successfully deleted the blog'})

        } catch (error) {
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ error: "Erreur lors de la mise à jour du blog"})
        }
    }

}

export default Authentication