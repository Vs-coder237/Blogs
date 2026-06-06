import httpCode from "../../core/constants/index.js"
import prisma from "../lib/prisma.js"
import {v4 as uuidv4} from "uuid"
import bcrypt from 'bcrypt'
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
                res.status(httpCode.BAD_REQUEST).json({message: 'this email already exist'})
            }

            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = await prisma.Users.create({
                data: {
                    id: uuidv4(),
                    name,
                    email,
                    password: hashedPassword,
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

    ReadAll: async (req, res) => {
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

    findUserById: async (req, res) => {
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

    updateUser: async (req, res) => {
        try {
            const {id} = req.params
            const {name, email, password} = req.body

            const updateUser = await prisma.Users.update({
                where: {id},
                data: {
                    name: name ?? name,
                    email: email ?? email,
                    password: password ?? password
                }
            })

            return res.status(httpCode.OK).json({message: 'User updated succesfully', updateUser})
        } catch (error) {
            return res.status(httpCode.INTERNAL_SERVER_ERROR).json({error: 'server error'})
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {id} = req.params

            const exist = await prisma.Users.findUnique({
                where: {id}
            })

            if (!exist) {
                return res.status(httpCode.NOT_FOUND).json({message: 'User not found'})
            }

            await prisma.Users.delete({
                where: {id}
            })

            return res.status(httpCode.OK).json({message: 'successfully deleted the User'})

        } catch (error) {
            return res.status(httpCode.INTERNAL_SERVER_ERROR).json({ error: "Error while deleting the User"})
        }
    }

}

export default Authentication