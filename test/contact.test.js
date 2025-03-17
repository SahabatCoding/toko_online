import supertest from "supertest"
import { createUserTest, removeContactTest, removeUserTest } from "./test-util.js"
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