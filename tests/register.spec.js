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
    test('register has been succesfull', async () => {
        try {
            await db.authenticate().then(() => console.log('conected'))
            chai.request(app)
                .post('/api/register/')
                .send(user).end((err, res) => {
                    if (err) console.log(err.message)
                    else {
                        console.log('11111111111')

                    }
                    server.close()
                })

        } catch (e) {
            console.log(e.message)
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