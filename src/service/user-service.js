import { prismaClient } from "../application/database.js"
import { ResponseErorr } from "../error/response-error.js"
import { getUserValidation, loginUserValidation, registerUserValidation, updateUserValidation } from "../validation/user-validation.js"
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

    const passwordValid = await bcrypt.compare(user.password, findUser.password)
    if(!passwordValid){
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

const get = async (req) =>{
    const user = validate(getUserValidation, req)

    const findUser = await prismaClient.user.findUnique({
        where :{
            username : user
        },
        select :{
            username : true
        }
    })

    if(!findUser){
        throw new ResponseErorr(401, "username is not found")
    }

    return findUser
}

const update = async (req) =>{
    const user = validate(updateUserValidation,req)

    const countUser = await prismaClient.user.count({
        where :{
            username : user.username
        }
    })

    if(countUser !== 1){
        throw new ResponseErorr(404, 'username is not found')
    }

    const data = {}

    if(user.password){
        data.password = await bcrypt.hash(user.password, 10)
    }
    
    return prismaClient.user.update({
        where:{
            username : user.username
        },
        data : data,
        select:{
            username : true
        }
    })

}

const logout = async (username)=> {
    username = validate(getUserValidation, username)

    const countUser = await prismaClient.user.count({
        where :{
            username : username
        }
    })

    if(countUser !== 1 ){
        throw new ResponseErorr(404, 'username is not found')
    }

    return prismaClient.user.update({
        where :{
            username : username
        },
        data : {
            token : null
        },
        select : {
            username : true
        }
    })
    
}

export default{
    register,
    login,
    get,
    update,
    logout
}