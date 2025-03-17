import { validate } from "../validation/validation.js"
import { createContactValidation } from "../validation/contact-validation.js"
import { prismaClient } from "../application/database.js"
import { ResponseErorr } from "../error/response-error.js"

const create = async(user, req)=>{
    const contact = validate(createContactValidation, req)
    contact.username = user

    return prismaClient.contact.create({
        data : contact,
        select :{
            id : true,
            first_name : true,
            last_name : true,
            email : true,
            phone : true,
            username : true
        }
    })
}

export default{
    create
}