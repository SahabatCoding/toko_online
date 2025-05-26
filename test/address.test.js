import supertest from "supertest"
import { createAddressTest, createContactTest, createUserTest, findContactTest, getAddressTest, removeAddressTest, removeContactTest, removeUserTest } from "./test-util.js"
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

describe('GET /api/contacts/:contactId/addresses/:addressesId',()=>{
    beforeEach(async()=>{
        await createUserTest()
        await createContactTest()
        await createAddressTest()
    })

    afterEach(async()=>{
        await removeAddressTest()
        await removeContactTest()
        await removeUserTest()
    })

    it('should can get address', async()=>{
        const getAddress = await getAddressTest()
        const result = await supertest(web)
            .get('/api/contacts/' + getAddress.contact_id + '/addresses/' + getAddress.id)
            .set('Authorization', 'test')

        expect(result.status).toBe(200)
        expect(result.body.data.street).toBe('Jln Haji naim')
        expect(result.body.data.city).toBe('Tangsel')
        expect(result.body.data.province).toBe('Banten')
        expect(result.body.data.country).toBe('Indonesia')
        expect(result.body.data.postal_code).toBe('15313')
        
    })

    it('should can reject if contact or address not found', async()=>{
        const getAddress = await getAddressTest()
        const result = await supertest(web)
            .get('/api/contacts/' + getAddress.contact_id + '/addresses/' + 6)
            .set('Authorization', 'test')

            expect(result.status).toBe(404)
    })
})


describe('PATCH /api/contacts/:contactId/addresses/:addressId', ()=>{
    beforeEach(async()=>{
        await createUserTest()
        await createContactTest()
        await createAddressTest()
    })

    afterEach(async()=>{
        await removeAddressTest()
        await removeContactTest()
        await removeUserTest()
    }) 
    
    it('should can update address', async()=>{
        const getAddress = await getAddressTest()
        const result = await supertest(web)
            .patch('/api/contacts/'+ getAddress.contact_id + '/addresses/' + getAddress.id)
            .set('Authorization', 'test')
            .send({
                street : 'hai',
                city : 'hai',
                province : 'hai',
                country : 'hai',
                postal_code : 'hai'
            })
        console.log(result.body)
        expect(result.status).toBe(200)
        expect(result.body.data.street).toBe('hai')
        expect(result.body.data.city).toBe('hai')
        expect(result.body.data.province).toBe('hai')
        expect(result.body.data.country).toBe('hai')        
        expect(result.body.data.postal_code).toBe('hai')
    })

    it('should can reject if update address is not found',async()=>{
        const getAddress = await getAddressTest()
        const result = await supertest(web)
            .patch('/api/contacts/' + getAddress.contact_id + '/addresses/' + 22)
            .set('Authorization', 'test')
            .send({
                street : 'hai',
                city : 'hai',
                province : 'hai',
                country : 'hai',
                postal_code : 'hai'
            })
        console.log(result.body)
        expect(result.status).toBe(404)
    })
})