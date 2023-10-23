const loginService = require('../services/login.service')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {
    validationResult
} = require('express-validator')

const Sentry = require('@sentry/node')

class LoginController {
    async login(req, res) {
        try {
            const result = validationResult(req)
            if (result.isEmpty()) {
                let token = null
                const {
                    login,
                    email,
                    password
                } = req.body
                const user = await loginService.getUser({
                    login,
                    email
                })

                if (user) {
                    const compare = await bcrypt.compare(password, user.password)
                    console.log(password, user.password)
                    const {
                        id
                    } = user
                    if (compare) {
                        token = jwt.sign({
                            id
                        }, process.env.SECRET_KEY)
                    }
                }
                if (!token) return res.status(400).json({
                    'message': 'login not exist'
                })
                res.send(token)
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

module.exports = new LoginController()