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
        expect(result.body.data.street).toBe('Jln Haji naim')
        expect(result.body.data.city).toBe('Tangsel')
        expect(result.body.data.province).toBe('Banten')
        expect(result.body.data.country).toBe('Indonesia')
        expect(result.body.data.postal_code).toBe('15313')
    })

    it('should can reject if not entering data completely',async ()=>{
        const contactId = await findContactTest()
        const result = await supertest(web)
        .post('/api/contacts/' + contactId.id + '/addresses' )
        .set('Authorization', 'test')
        .send({
            street : '',
            city : 'Tangsel',
            province : 'Banten',
            country : 'Indonesia',
            postal_code : '15313'
        })

        expect(result.status).toBe(400)
    })
})