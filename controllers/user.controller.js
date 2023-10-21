const userService = require('../services/user.service.js')
const {
    validationResult
} = require('express-validator')
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
            console.log(e)
        }
    }
    async aggGoogleToken(req, res) {
        try {
            const result = validationResult(req)
            if (result.isEmpty()) {
                const result = await userService.aggGoogleToken(req.userId, req.body.googleToken)
                console.log(result)
                res.send(result)
            } else {
                res.send({
                    error: result.array()
                })
            }
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new UserController()