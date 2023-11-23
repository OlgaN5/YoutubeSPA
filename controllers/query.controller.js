const queryService = require("../services/query.service")
const userService = require('../services/user.service')
const {
    validationResult
} = require('express-validator')

const Sentry = require('@sentry/node')

class QueryController {
    async search(req, res) {
        try {
            const result = validationResult(req)
            if (result.isEmpty()) {
                const user = await userService.findUserByConditions({
                    id: req.userId
                })
                const result = await queryService.search(user, req.params.query, req.query.prevPageToken, req.query.nextPageToken)
                if (!result) return res.status(403).json('need a google token')
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
module.exports = new QueryController()