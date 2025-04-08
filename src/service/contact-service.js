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

    const filters = []

    filters.push({
        username : user.username
    })

    if(request.name){
        filters.push({
            OR : [
                {
                    first_name : {
                        contains : request.name
                    }
                },
                {
                    last_name : {
                        contains : request.name
                    }
                }
            ]
        })
    }

    if (request.email){
        filters.push({
            email : {
                contains : request.email
            }
        })
    }

    if (request.phone){
        filters.push({
            phone : {
                contains : request.phone
            }
        })
    }

    const contacts = await prismaClient.contact.findMany({
        where :{
            AND : filters
        },
        take : request.size,
        skip : skip
    })

    const totalItems = await prismaClient.contact.count({
        where :{
            AND : filters
        }
    })

    return {
        data : contacts,
        paging :{
            page : request.page,
            total_item : totalItems,
            total_page : Math.ceil(totalItems / request.page)
        }
    }

}


export default{
    create,
    get,
    update,
    remove,
    search
}