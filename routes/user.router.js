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
/**
 * @swagger
 * components:
 *   schemas:
 *     NoTokenResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           default: no token  
 *     NoGoogleTokenResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           default: need a google token  
 *     Pagination:
 *       type: object
 *       properties:
 *         nextPageToken:
 *           type: string
 *           default: CAoQAA  
 *         prevPageToken:
 *           type: object
 *           default: null  
 *     PageInfo:
 *       type: object
 *       properties:
 *         totalResults:
 *           type: string
 *           default: 10000  
 *         resultsPerPage:
 *           type: string
 *           default: 1 
 *         pagination:
 *           $ref: '#/components/schemas/Pagination'
 *     ThumbnailsProperties:
 *       type: object
 *       properties:
 *         url:
 *           type: string
 *           default: https://i.ytimg.com/vi/97SU9pj4wTY/default.jpg
 *         width:
 *           type: string
 *           default: 120 
 *         height:
 *           type: string
 *           default: 90
 *     Thumbnails:
 *       type: object
 *       properties:
 *         default:
 *           $ref: '#/components/schemas/ThumbnailsProperties'
 *         medium:
 *           $ref: '#/components/schemas/ThumbnailsProperties'
 *         high:
 *           $ref: '#/components/schemas/ThumbnailsProperties'
 *         standard:
 *           $ref: '#/components/schemas/ThumbnailsProperties'
 *         maxres:
 *           $ref: '#/components/schemas/ThumbnailsProperties'
 *     Snippet:
 *       type: object
 *       properties:
 *         channelId:
 *           type: string
 *           default: UCGGlDdIlbyViz6MFdJMk1iw  
 *         title:
 *           type: string
 *           default: title 
 *         description:
 *           type: string
 *           default: description
 *         thumbnails:
 *           $ref: '#/components/schemas/Thumbnails' 
 *     Statistics:
 *       type: object
 *       properties:
 *         viewCount:
 *           type: string
 *           default: 1571659  
 *         likeCount:
 *           type: string
 *           default: 11521 
 *         favoriteCount:
 *           type: string
 *           default: 0
 *         commentCount:
 *           type: string
 *           default: 0
 *     Item:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           default: 10000  
 *         snippet:
 *           $ref: '#/components/schemas/Snippet' 
 *         statistics:
 *           $ref: '#/components/schemas/Statistics' 
 *     Items:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/Item'
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
 *             required: 
 *               - googleToken
 *             properties:
 *               googleToken:
 *                 type: string
 *                 default: token
 *     responses:
 *       '200':
 *         descrition: query has saved succesfull
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: integer
 *                   default: token added
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NoTokenResponse'
 */
router.post('/addGoogleToken', addTokenValidation, authenticate, userController.aggGoogleToken)
module.exports = router