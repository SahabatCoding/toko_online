import { prismaClient } from "../application/database.js"
import { ResponseErorr } from "../error/response-error.js"
import { createAddressValidation, getAddressValidation } from "../validation/address-validation.js"
import { getContactValidation } from "../validation/contact-validation.js"
import { validate } from "../validation/validation.js"

const checkContactMustExists = async(user, contactId) =>{
    contactId = validate(getContactValidation, contactId)

    const countContactId = await prismaClient.contact.count({
        where :{
            id : contactId,
            username : user.username
        }
    })

    if (countContactId !== 1){
        throw new ResponseErorr(404, 'contact is not found')
    }

    return contactId

}

const create = async (user, contactId, req) =>{
    contactId = await checkContactMustExists(user, contactId)

    const address = validate(createAddressValidation, req)
    address.contact_id = contactId

    return prismaClient.address.create({
        data : address,
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

const get = async(user, contactId, addressId)=>{
    contactId = await checkContactMustExists(user, contactId)
    addressId = validate(getAddressValidation, addressId)

     const findAddress = await prismaClient.address.findUnique({
        where :{
            id : addressId,
            contact_id : contactId
        },
        select:{
            id : true,
            street : true,
            city : true,
            province : true,
            country : true,
            postal_code : true
        }
     })

     if(!findAddress){
        throw new ResponseErorr(404, 'Address is not found')
     }
    
    return findAddress
}

export default{
    create,
    get
}