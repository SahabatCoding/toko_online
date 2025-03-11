import { prismaClient } from "../application/database.js"
import { ResponseErorr } from "../error/response-error"
import { registerUserValidation } from "../validation/user-validation.js"
import { validate } from "../validation/validation.js"
import bcrypt from "bcryptjs"

const register = async (req) =>{
    const user = validate(registerUserValidation, req)


    const userFind = await prismaClient.user.count({
        where : user.username
    })

    if(userFind === 1){
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

export default{
    register
}