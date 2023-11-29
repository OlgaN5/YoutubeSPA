const {
    body,
    param,query
} = require('express-validator')

const registerValidation = [
    body('login').notEmpty().escape().isString().isLength({
        min: 3,
        max: 10
    }).withMessage('Login has to be between 3 and 10'),
    body('email').notEmpty().escape().isString().isEmail().withMessage(`It isn't email`),
    body('password').notEmpty().escape().isString().isLength({
        min: 3,
        max: 15
    }).withMessage('Password has to be between 3 and 15'),
]

const loginValidation = [
    body('login').notEmpty().escape().isString(),
    body('password').notEmpty().isString(),
]

const queryValidation = [
    query('query').notEmpty().escape(),
    query('prevPageToken').optional().escape().isString(),
    query('nextPageToken').optional().escape().isString(),
    query('title').optional().escape().isString(),
    query('countResult').optional().escape().isInt(),
    query('sortBy').optional().escape().isString()
]
const idValidation = param('id').notEmpty().escape()
const parametersQueryValidation = [
    body('title').optional().isString(),
    body('maxCount').optional().isInt(),
    body('sortBy').optional().isString(),
]
const savedQueryValidation = parametersQueryValidation.concat(idValidation)

const addTokenValidation = [
    body('googleToken').notEmpty().escape().isString()
]

module.exports = {
    idValidation,
    loginValidation,
    queryValidation,
    savedQueryValidation,
    registerValidation,
    addTokenValidation
}