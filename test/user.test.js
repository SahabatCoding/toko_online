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

            console.log(result.body)
            expect(result.status).toBe(200)
            expect(result.body.data.username).toBe('Chairuly')
    })

    it('should reject if username registration is wrong',async ()=>{
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username : '',
                password : 'rahasiaa'
            })

            expect(result.status).toBe(400)
    })

    it('should reject if password registration is wrong', async()=>{
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

    it('should can login users', async()=>{
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username : 'Chairuly',
                password : 'rahasiaa'
            })

            expect(result.status).toBe(200)
            expect(result.body.data.token).toBeDefined()
    })

    it('should reject if username is wrong',async ()=>{
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username : 'sagdogs',
                password : 'rahasiaa'
            }) 

        expect(result.status).toBe(401)
    })

    it('should reject if password is wrong when logging in', async()=>{
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username : 'Chairuly',
                password : 'salah'
            })

            expect(result.status).toBe(401)
    })

 })

 describe('GET /api/users/current', ()=>{
    beforeEach(async()=>{
        await createUserTest()
    })

    afterEach(async()=>{
        await removeUserTest()
    })

    it('should can get users',async()=>{
        const result = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', 'test')
            
            console.log(result.body)
            expect(result.status).toBe(200)
            expect(result.body.data.username).toBe('Chairuly')
    })

    it('should reject if get users is wrong', async()=>{
        const result = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', 'salah')

            expect(result.status).toBe(401)
    })
 })

 describe('PATCH /api/users/current',()=>{
    beforeEach(async()=>{
        await createUserTest()
    })

    afterEach(async()=>{
        await removeUserTest()
    })

    it('should can update users', async()=>{
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'test')
            .send({
                password : 'RahasiaBanget'
            })

        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe('Chairuly')
    })

    it('should reject if update is wrong', async()=>{
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'test')
            .send({
                password : 'salah'
            })

            expect(result.status).toBe(400)
    })
 })

 describe('DELETE /api/users/current/delete', ()=>{
    beforeEach(async()=>{
        await createUserTest()
    })

    afterEach(async()=>{
        await removeUserTest()
    })

    it('should can logout users',async()=>{
        const result = await supertest(web)
            .delete('/api/users/current/logout')
            .set('Authorization','test')

        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe('Chairuly')
    })

    it('should reject if logout is wrong', async()=>{
        const result = await supertest(web)
            .delete('/api/users/current/logout')
            .set('Authorization', 'salah')
        
        expect(result.status).toBe(401)
    })
 })