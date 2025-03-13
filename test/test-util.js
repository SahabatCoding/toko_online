import { prismaClient } from "../src/application/database.js"
import bcrypt from "bcryptjs"

const removeUserTest = async ()=>{
    return prismaClient.user.deleteMany({
        where : {
            username : 'Chairuly'
        }
    })
}

const createUserTest = async ()=>{
    return prismaClient.user.create({
        data:{
            username : 'Chairuly',
            password : await bcrypt.hash('rahasiaa', 10),
            token : 'test'
        }
    })
}

export {
    removeUserTest,
    createUserTest
}