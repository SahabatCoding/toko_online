import supertest from "supertest"
import { web } from "../src/application/web.js"
import { removeUserTest } from "./test-util.js"

describe('POST api/users', ()=>{
    
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
    })
})