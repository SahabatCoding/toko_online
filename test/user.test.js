import supertest from "supertest"
import { web } from "../src/application/web.js"
import { createUserTest, removeUserTest } from "./test-util.js"

describe('POST /api/users', ()=>{
    
    afterEach(async ()=>{
        await removeUserTest()
    })

    it('should can register user', async ()=>{
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username : 'Chairuly',
                password :'rahasiaa'
            })

            expect(result.status).toBe(200)
            expect(result.body.data.username).toBe('Chairuly')
    })

    it('must be able to refuse if the registered username is invalid',async ()=>{
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username : '',
                password : 'rahasiaa'
            })

            expect(result.status).toBe(400)
    })

    it('must be able to refuse if the registered password is invalid', async()=>{
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username : 'Chairuly',
                password : ''
            })

            expect(result.status).toBe(400)
    })
})

 describe('POST /api/users/login',()=>{
    beforeEach(async()=>{
        await createUserTest()
    })

    afterEach(async()=>{
        await removeUserTest()
    })

    it('should be able to log in as user', async()=>{
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username : 'Chairuly',
                password : 'rahasiaa'
            })

            expect(result.status).toBe(200)
            expect(result.body.data.token).toBeDefined()
    })
 })