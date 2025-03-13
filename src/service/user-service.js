import { prismaClient } from "../application/database.js"
import { ResponseErorr } from "../error/response-error.js"
import { loginUserValidation, registerUserValidation } from "../validation/user-validation.js"
import { validate } from "../validation/validation.js"
import bcrypt from "bcryptjs"
import {v4 as uuid } from 'uuid'

const register = async (req) =>{
    const user = validate(registerUserValidation, req)


    const countUser = await prismaClient.user.count({
        where : {
            username : user.username
        }
    })

    if(countUser === 1){
        throw new ResponseErorr(400, 'Username already exists')
    }

    user.password = await bcrypt.hash(user.password, 10)

    return prismaClient.user.create({
        data: user,
        select :{
            username : true
        }
    })
}

const login = async (req) =>{
    const user = validate(loginUserValidation, req)

    const findUser = await prismaClient.user.findUnique({
        where :{
            username : user.username
        }
    })

    if(!findUser){
        throw new ResponseErorr(401, 'Username or Password Wrong')
    }

    const token = uuid().toString()

    return prismaClient.user.update({
        where : {
            username : findUser.username
        },
        data :{
            token : token
        },
        select :{
            token : true
        }

    })

}

export default{
    register,
    login
}