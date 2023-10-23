const queryService = require("../services/query.service")
const userService = require('../services/user.service')
const {
    validationResult
} = require('express-validator')

const Sentry = require('@sentry/node')

class QueryController {
    async getVideos(req, res) {
        try {
            const result = validationResult(req)
            if (result.isEmpty()) {
                const user = await userService.findUser(req.userId)
                const result = await queryService.getVideos(user, req.params.query, req.query.prevPageToken, req.query.nextPageToken)
                res.send(result)
            } else {
                res.send({
                    error: result.array()
                })
            }
        } catch (e) {
            Sentry.captureException(e)
        }
    }
    async saveQuery(req, res) {
        try {
            const result = validationResult(req)
            if (result.isEmpty()) {
                const result = await queryService.saveQuery(req.params.id, req.body)
                res.send(result)
            } else {
                res.send({
                    error: result.array()
                })
            }
        } catch (e) {
            Sentry.captureException(e)
        }
    }
    async editSavedQuery(req, res) {
        try {
            const result = validationResult(req)
            if (result.isEmpty()) {
                const result = await queryService.updateQuery(req.params.id, req.body)
                res.send(result)
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
module.exports = new QueryController()