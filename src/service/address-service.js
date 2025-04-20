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
    contactId = await checkContactMustExists(user, contactId)

    const address = validate(createAddressValidation, req)
    address.contact_id = contactId

    return prismaClient.address.create({
        data :{
            street : address.street,
            city : address.city,
            province : address.province,
            country : address.country,
            postal_code : address.postal_code,
            contact_id : address.contact_id
        },
        select :{
            id : true,
            street : true,
            city : true,
            province : true,
            country : true,
            postal_code : true
        }
    })
}

export default{
    create
}