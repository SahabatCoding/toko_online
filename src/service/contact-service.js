import { validate } from "../validation/validation.js"
import { createContactValidation, getContactValidation } from "../validation/contact-validation.js"
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

const get = async (user, contactId)=>{
    const contact = validate(getContactValidation, contactId)

    const findContact = await prismaClient.contact.findUnique({
        where : {
            id : contactId,
            username : user
        },
        select :{
            id : true,
            first_name : true,
            last_name : true,
            email : true,
            phone : true
        }
    })

}

export default{
    create,
    get
}