import { prismaClient } from "../src/application/database.js"
import bcrypt from "bcryptjs"

const removeUserTest = async () => {
    return prismaClient.user.deleteMany({
        where: {
            username: 'Chairuly'
        }
    })
}

const createUserTest = async () => {
    return prismaClient.user.create({
        data: {
            username: 'Chairuly',
            password: await bcrypt.hash('rahasiaa', 10),
            token: 'test'
        }
    })
}

const removeContactTest = async () => {
    return prismaClient.contact.deleteMany({
        where: {
            username: 'Chairuly'
        }
    })
}

const createContactTest = async () => {
    return prismaClient.contact.create({
        data: {
            first_name: 'Chairul',
            last_name: 'Yusuf',
            email: 'chairul@gmail.com',
            phone: '089123456',
            username: 'Chairuly'
        }
    })
}

const findContactTest = async () => {
    return prismaClient.contact.findUnique({
        where: {
            username: 'Chairuly'
        }
    })
}

const createManyContact = async () => {
    for (let i = 0; i < 20; i++) {
        return prismaClient.contact.create({
            data: {
                first_name: `Chairul${i}`,
                last_name: `Yusuf${i}`,
                email: `chairul${i}@gmail.com`,
                phone: '089123456',
                username: 'Chairuly'
            }
        })

    }
}

const removeAddressTest = async () => {
    return prismaClient.address.deleteMany({
        where: {
            contact: {
                username: "Chairuly"
            }
        }
    })
}

const createAddressTest = async () => {
    const getContact = await findContactTest()
    return prismaClient.address.create({
        data: {
            street: 'Jln Haji naim',
            city: 'Tangsel',
            province: 'Banten',
            country: 'Indonesia',
            postal_code: '15313',
            contact_id : getContact.id

        }
    })
}

const getAddressTest = async()=>{
    return prismaClient.address.findFirst({
        where :{
            contact :{
                username : 'Chairuly'
            }
        }
    })
}

export {
    removeUserTest,
    createUserTest,
    removeContactTest,
    createContactTest,
    findContactTest,
    removeAddressTest,
    createAddressTest,
    getAddressTest
}