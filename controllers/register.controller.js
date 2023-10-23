const registerService = require('../services/register.service')
const bcrypt = require('bcrypt')
const {
    validationResult
} = require('express-validator')

const Sentry = require('@sentry/node')

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
                const isEmail = await registerService.findUserByConditions(conditionsEmail)
                const isLogin = await registerService.findUserByConditions(conditionsLogin)

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
                const hashedPassword = await bcrypt.hashSync(password, saltRounds)
                const user = await registerService.createUser({
                    email,
                    login,
                    password: hashedPassword
                })

                res.send(user)
            } else {
                res.send({
                    error: result.array()
                })
            }
        } catch (e) {
            Sentry.captureException(e)
        }
    }
}
module.exports = new RegisterController()