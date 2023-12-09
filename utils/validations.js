const {
    body,
    param,query
} = require('express-validator')

const registerValidation = [
    body('login').notEmpty().trim().escape().isString().isLength({
        min: 3,
        max: 10
    }).withMessage('Login has to be between 3 and 10'),
    body('email').notEmpty().trim().escape().isString().isEmail().withMessage(`It isn't email`),
    body('password').notEmpty().trim().escape().isString().isLength({
        min: 3,
        max: 15
    }).withMessage('Password has to be between 3 and 15'),
]

const loginValidation = [
    body('login').notEmpty().trim().escape().isString(),
    body('password').notEmpty().trim().isString(),
]

const queryValidation = [
    query('query').notEmpty().trim().escape(),
    query('prevPageToken').optional().trim().escape().isString(),
    query('nextPageToken').optional().trim().escape().isString(),
    query('title').optional().trim().escape().isString(),
    query('countResult').optional().trim().escape().isInt(),
    query('sortBy').optional().trim().escape().isString()
]
const idValidation = param('id').notEmpty().escape()
const parametersQueryValidation = [
    body('title').optional().trim().isString(),
    body('maxCount').optional().trim().isInt(),
    body('sortBy').optional().trim().isString(),
]
const savedQueryValidation = parametersQueryValidation.concat(idValidation)

const addTokenValidation = [
    body('googleToken').notEmpty().trim().escape().isString()
]

module.exports = {
    idValidation,
    loginValidation,
    queryValidation,
    savedQueryValidation,
    registerValidation,
    addTokenValidation
}