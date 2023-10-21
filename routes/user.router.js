const express = require('express')
const userController = require('../controllers/user.controller')

const router = express.Router()
const authenticate = require('../utils/authenticate')
const {
    body
} = require('express-validator')
const addTokenValidation = [
    body('googleToken').notEmpty().escape().isString()
]

router.get('/logout', authenticate, userController.logout)
/**s
 * @swagger
 * /api/user/addGoogleToken:
 *   post:
 *     tags: 
 *       - Users
 *     summary: use to add google token
 *     descrition: returns user
 *     security: 
 *       - bearerAuth: []
 *     requestBody:
 *       description: token
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               googleToken:
 *                 type: string
 *                 default: token
 *     responses:
 *       '200':
 *         descrition: query has saved succesfull
 */
router.post('/addGoogleToken', addTokenValidation, authenticate, userController.aggGoogleToken)
module.exports = router