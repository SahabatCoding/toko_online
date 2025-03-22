import supertest from "supertest"
import { createContactTest, createUserTest, findContactTest, removeContactTest, removeUserTest } from "./test-util.js"
import { web } from "../src/application/web.js"

describe('POST /api/contacts',()=>{
    beforeEach(async()=>{
        await createUserTest()
    })

    afterEach(async()=>{
        await removeContactTest()
        await removeUserTest()
    })

    it('should can create contact',async()=>{
        const result = await supertest(web)
            .post('/api/contacts')
            .set('Authorization', 'test')
            .send({
                first_name : 'Chairul',
                last_name : 'Yusuf',
                email : 'chairul@gmail.com',
                phone : '089123456'
            })
        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe('Chairuly')
        expect(result.body.data.first_name).toBe('Chairul')
        expect(result.body.data.last_name).toBe('Yusuf')
        expect(result.body.data.email).toBe('chairul@gmail.com')
        expect(result.body.data.phone).toBe('089123456')

    })

    it('should reject if create contact first_name null',async()=>{
        const result = await supertest(web)
            .post('/api/contacts')
            .set('Authorization', 'test')
            .send({
                first_name : '',
                last_name : 'Yusuf',
                email : 'chairul@gmail.com',
                phone : '089123456'
            })
        expect(result.status).toBe(400)

    })

    it('should reject if create contact email invalid',async()=>{
        const result = await supertest(web)
            .post('/api/contacts')
            .set('Authorization', 'test')
            .send({
                first_name : 'Chairul',
                last_name : 'Yusuf',
                email : 'chairulgmail.com',
                phone : '089123456'
            })
        expect(result.status).toBe(400)

    })

})

describe('GET /api/contacts/:contactId',()=>{
    beforeEach(async()=>{
        await createUserTest()
        await createContactTest()
    })

    afterEach(async()=>{
        await removeContactTest()
        await removeUserTest()
    })

    it('should can get user',async()=>{
        const contactId = await findContactTest()
        const result = await supertest(web)
            .get(`/api/contacts/` + `${contactId.id}`)
            .set('Authorization', 'test')

            console.log(result.body)
            expect(result.status).toBe(200)
            expect(result.body.data.first_name).toBe('Chairul')
            expect(result.body.data.last_name).toBe('Yusuf')
            expect(result.body.data.email).toBe('chairul@gmail.com')
            expect(result.body.data.phone).toBe('089123456')
            expect(result.body.data.username).toBe('Chairuly')
            
        })
        it('should reject if get user contactId not number ',async()=>{
            const contactId = await findContactTest()
            const result = await supertest(web)
                .get(`/api/contacts/` + `salah`)
                .set('Authorization', 'test')
    
                console.log(result.body)
                expect(result.status).toBe(400)
                
            })

            it('should reject if get user contactId is wrong ',async()=>{
                const contactId = await findContactTest()
                const result = await supertest(web)
                    .get(`/api/contacts/` + `38`)
                    .set('Authorization', 'test')
        
                    console.log(result.body)
                    expect(result.status).toBe(401)
                    
                })
    })

describe('PUT /api/contacts/:contactId',()=>{
    beforeEach(async()=>{
        await createUserTest()
        await createContactTest()
    })

    afterEach(async()=>{
        await removeContactTest()
        await removeUserTest()
    })

    it('should can update contacts',async ()=>{
        const contactId = await findContactTest()
        const result = await supertest(web)
            .put(`/api/contacts/` + `${contactId.id}`)
            .set('Authorization', 'test')
            .send({
                first_name : 'Daniel',
                last_name : 'Chris',
                email : 'Daniel@gmail.com',
                phone : '0897'
            })
        console.log(result.body)
        expect(result.status).toBe(200)
        expect(result.body.data.first_name).toBe('Daniel')
        expect(result.body.data.last_name).toBe('Chris')
        expect(result.body.data.email).toBe('Daniel@gmail.com')
        expect(result.body.data.phone).toBe('0897')

    })

    it('should reject update contacts is wrong',async ()=>{
        const contactId = await findContactTest()
        const result = await supertest(web)
            .put(`/api/contacts/` + `salah`)
            .set('Authorization', 'test')
            .send({
                first_name : 'Daniel',
                last_name : 'Chris',
                email : 'Daniel@gmail.com',
                phone : '0897'
            })
        console.log(result.body)
        expect(result.status).toBe(400)

    })
})