import httpCode from "../../core/constants/index.js";
import { v4 as uuidv4 } from "uuid";
import prisma from "../lib/prisma.js";

const userManagement = {
    createUser : async (req, res) => {
        try {
            const {name, email, password} = req.body

            if (!name || !email || !password) {
                res.send(httpCode.BAD_REQUEST).json({error: 'please enter all fields'})
            }

            const newUser = await prisma.Users.create({
                data: {
                    id: uuidv4(),
                    name,
                    email,
                    password
                }
            })

            if (!newUser) {
                res.status(httpCode.NO_CONTENT).json({error: 'error'})
            }
            return res.status(httpCode.CREATED).json({message: 'The blog has been created succesfully', newUser})

        } catch (error) {
            res.status(httpCode.INTERNAL_SERVER_ERROR).json({error: 'server error'})
        }
    }
}

export default userManagement