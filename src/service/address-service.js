import { prismaClient } from "../application/database.js"
import { ResponseErorr } from "../error/response-error.js"
import { createAddressValidation } from "../validation/address-validation.js"
import { getContactValidation } from "../validation/contact-validation.js"
import { validate } from "../validation/validation.js"

const checkContactMustExists = async(user, contactId) =>{
    contactId = validate(getContactValidation)

    const countContactId = await prismaClient.contact.count({
        where :{
            id : contactId,
            username : user.username
        }
    })

    if (countContactId !== 1){
        throw new ResponseErorr(401, 'contact is not found')
    }

    return contactId

}

const create = async (user, contactId, req) =>{
    contactId = validate(getContactValidation)
    const address = validate(createAddressValidation)
    address.contact_id = contactId

    const countContact = await prismaClient.contact.count({
        where : {
            id : contactId,
            username : user.username    
        }
    })

    if(countContact !== 1){
        throw new ResponseErorr(401 , 'contact is not found')
    }

    return prismaClient.address.create
                       
}