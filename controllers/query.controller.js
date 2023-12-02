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
                const result = await queryService.getResults(user, req.query.query, req.query.prevPageToken, req.query.nextPageToken,  req.query.countResult, req.query.sortBy)
                if (!result) return res.status(403).json('need a google token')
                res.send(result)
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
    async saveQuery(req, res) {
        try {
            const result = validationResult(req)
            if (result.isEmpty()) {
                const result = await queryService.saveQuery(req.params.id, req.body)
                // if (result) {
                res.status(201)
                    .set('Status-Text', 'Saved query created')
                    .send(result)
                // } else {
                // res.send('error')
                // }
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
    async editSavedQuery(req, res) {
        try {
            const result = validationResult(req)
            if (result.isEmpty()) {
                const result = await queryService.updateQuery(req.params.id, req.body)
                const message = result ? 'query edited' : 'query not edited'
                res.send({
                    message: message
                })
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
    async deleteSavedQuery(req, res) {
        try {
            const result = validationResult(req)
            if (result.isEmpty()) {
                const query = await queryService.deleteSavedQuery(+req.params.id)
                console.log(query)
                res.send({
                    message: 'deleted successful',
                    countDeleted: query
                })
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
    async getFavourites(req, res) {
        try {
            const result = validationResult(req)
            if (result.isEmpty()) {
                const favorites = await queryService.getFavourites(req.userId)
                res.send(favorites)
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
module.exports = new QueryController()