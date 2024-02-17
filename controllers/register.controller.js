const bcrypt = require('bcrypt')
const {
    validationResult
} = require('express-validator')

const Sentry = require('@sentry/node')
const userService = require('../services/user.service')
class RegisterController {
    async register(req, res) {
        try {
            const result = validationResult(req)
            if (result.isEmpty()) {
                const saltRounds = 4
                const {
                    email,
                    login,
                    password
                } = req.body
                const conditionsEmail = {
                    email
                }
                const conditionsLogin = {
                    login
                }
                const isEmail = await userService.findUserByConditions(conditionsEmail)
                const isLogin = await userService.findUserByConditions(conditionsLogin)

                if (isEmail) {
                    return res.status(400).json({
                        message: 'email is exist'
                    })
                }
                if (isLogin) {
                    return res.status(400).json({
                        message: 'login is exist'
                    })
                }
                const hashedPassword = await bcrypt.hash(password, saltRounds)
                const user = await userService.createUser({
                    email,
                    login,
                    password: hashedPassword
                })

                res.status(201)
                    .set('Status-Text', 'User created')
                    .send(user)
            } else {
                res.send({
                    error: result.array()
                })
            }
        } catch (e) {
            res.send(e.message)
            Sentry.captureException(e)
        }
    }
}
module.exports = new RegisterController()