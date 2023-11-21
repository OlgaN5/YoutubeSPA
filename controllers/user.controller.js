const userService = require('../services/user.service.js')
const {
    validationResult
} = require('express-validator')

const Sentry = require('@sentry/node')

class UserController {
    async logout(req, res) {
        try {
            const result = validationResult(req)
            if (result.isEmpty()) {

            } else {
                res.send({
                    error: result.array()
                })
            }
        } catch (e) {
            Sentry.captureException(e)
        }
    }
    async aggGoogleToken(req, res) {
        try {
            console.log('111111')
            const result = validationResult(req)
            if (result.isEmpty()) {
                const result = await userService.aggGoogleToken(req.userId, req.body.googleToken)
                res.send({
                    countUpdated: result[0]
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

module.exports = new UserController()