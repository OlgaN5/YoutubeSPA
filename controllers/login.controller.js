const loginService = require('../services/login.service')
const userService = require('../services/user.service')
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
                const identificator = login ? 'login' : 'email'
                const conditions = {
                    [identificator]: req.body[identificator]
                }
                const user = await userService.findUserByConditions(conditions)

                if (user) {
                    const compare = await bcrypt.compare(password, user.password)
                    const {
                        id
                    } = user
                    if (compare) {
                        token = jwt.sign({
                            id
                        }, process.env.SECRET_KEY)
                    }else{
                        res.status(401).json({
                            'message': 'password invalid'
                        })
                    }
                }
                if (!token) return res.status(400).json({
                    'message': 'login not exist'
                })
                res.send({
                    accessToken: token
                })
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