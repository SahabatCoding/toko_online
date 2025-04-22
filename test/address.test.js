import supertest from "supertest"
import { createContactTest, createUserTest, findContactTest, removeAddressTest, removeContactTest, removeUserTest } from "./test-util.js"
import { web } from "../src/application/web.js"

describe('POST /api/contact/:contactId/addresses',()=>{
    beforeEach(async()=>{
        await createUserTest()
        await createContactTest()
    })

    afterEach(async()=>{
        await removeAddressTest()
        await removeContactTest()
        await removeUserTest()
    })

    it('should can create address', async()=>{
        const contactId = await findContactTest()
        const result = await supertest(web)
            .post('/api/contacts/' + contactId.id + '/addresses' )
            .set('Authorization', 'test')
            .send({
                street : 'Jln Haji naim',
                city : 'Tangsel',
                province : 'Banten',
                country : 'Indonesia',
                postal_code : '15313'
            })
        console.log(result.body)
        expect(result.status).toBe(200)
    })
})