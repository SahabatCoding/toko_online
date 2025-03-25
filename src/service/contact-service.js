import { validate } from "../validation/validation.js"
import { createContactValidation, getContactValidation, searchContactValidation, updateContactValidation } from "../validation/contact-validation.js"
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
    contactId = validate(getContactValidation, contactId)

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
            phone : true,
            username : true
        }
    })

    if(!findContact){
        throw new ResponseErorr(401, 'Username is not found')
    }

    return findContact

}

const update = async (user, req)=>{
    const contact = validate(updateContactValidation, req)

    const countContact = await prismaClient.contact.count({
        where :{
            username : user,
            id : contact.id
        }
    })

    if(countContact !== 1){
        throw new ResponseErorr(401, 'Contact is not found')
    }

    return prismaClient.contact.update({
        where :{
            id : contact.id
        },
        data :{
            first_name : contact.first_name,
            last_name : contact.last_name,
            email : contact.email,
            phone : contact.phone
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

const remove = async (user, contactId)=>{
    contactId = validate(getContactValidation, contactId)

    const countContact = await prismaClient.contact.count({
        where :{
            id : contactId,
            username : user
        }
    })

    if(countContact !== 1){
        throw new ResponseErorr(401,'contact is not found')
    }

    return prismaClient.contact.delete({
        where :{
            id : contactId
        }
    })
}

const search = async(user, request)=>{
    request = validate(searchContactValidation, request)

    const skip = (request.page - 1) * request.size 
}


export default{
    create,
    get,
    update,
    remove
}