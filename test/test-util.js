import { prismaClient } from "../src/application/database.js"

const removeUserTest = async ()=>{
    return prismaClient.user.deleteMany({
        where : {
            username : 'Chairuly'
        }
    })
}

export {
    removeUserTest
}