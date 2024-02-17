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
                const result = await queryService.getResults(user, req.query.query, req.query.prevPageToken, req.query.nextPageToken, req.query.countResult, req.query.sortBy)
                if (!result) return res.status(403).json('need a google token')
                res.send(result)
            } else {
                res.send({
                    error: result.array()
                })
            }
        } catch (e) {
            if (e.message === 'Request failed with status code 403') {
                res.status(500)
                    .json({
                        message: 'The count of requests has been exceeded. Please wait or get a new token'
                    })
            } else {
                res.send(e.message)
            }
            Sentry.captureException(e)
        }
    }
    async saveQuery(req, res) {
        try {
            const result = validationResult(req)
            if (result.isEmpty()) {
                const result = await queryService.saveQuery(req.params.id, req.body, req.userId)
                if (!result) {
                    return res.status(400)
                        .send({
                            message: 'User has no query with such id'
                        })

                } else {
                    return res.status(201)
                        .set('Status-Text', 'Saved query created')
                        .send(result)
                }
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
                console.log('req.userId')
                console.log(req.userId)
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