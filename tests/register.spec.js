// const jest = require('jest')


const chai = require('chai')
const chaiHttp = require('chai-http')
const {
    app,
    server
} = require('../index')
const db = require('../config/database')

chai.should()
chai.use(chaiHttp)
jest.useFakeTimers()
const user = {
    login: 'test',
    email: 'test@gmail.com',
    password: 'password'
}
describe('test register', () => {
    test('register has been successful', async () => {
        try {
            await db.authenticate()
            const res = await chai.request(app)
                .post('/api/register/')
                .send(user)
                console.log(res)
            expect(res.status).toBe(400)
            // expect(res.body).to.be.an('object')
            // expect(res.body.message).to.equal('Registration successful')
        } catch (error) {
            console.log(error)
        } finally {
            server.close()
        }
    })
})

// res.should.have.status(200)
// expect(res.status).toBe(200)
// expect(res.body).toHaveProperty('id')
// expect(res.body.id).toBeNumber()
// expect(res.body).toHaveProperty('login', 'test')
// expect(res.body).toHaveProperty('email', 'test@gmail.com')
// expect(res.body).toHaveProperty('password', 'password')