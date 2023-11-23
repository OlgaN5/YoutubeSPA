const {
    body,
    param
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

const queryValidation = param('query').notEmpty().escape()
const idValidation = param('id').notEmpty().escape()
const parametersQueryValidation = [
    body('maxCount').optional().isInt(),
    body('sortBy').optional().isString(),
]
const savedQueryValidation = parametersQueryValidation.concat(idValidation)


module.exports = {
    loginValidation,
    queryValidation,
    savedQueryValidation,
    registerValidation
}