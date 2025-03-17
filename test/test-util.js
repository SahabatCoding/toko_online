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

const removeContactTest = async()=>{
    return prismaClient.contact.deleteMany({
        where :{
            username : 'Chairuly'
        }
    })
}

export {
    removeUserTest,
    createUserTest,
    removeContactTest
}