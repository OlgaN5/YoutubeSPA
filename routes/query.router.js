const express = require('express')
const queryController = require('../controllers/query.controller')
const authenticate = require('../utils/authenticate')
const router = express.Router()

const {
    queryValidation,
    savedQueryValidation
} = require('../utils/validations')

/**
 * @swagger
 * /api/query/search/{query}:
 *   get:
 *     tags: 
 *       - Query
 *     summary: use to get videos
 *     descrition: returns result of query
 *     security: 
 *       - bearerAuth: []
 *     parameters:
 *       - name: query
 *         in: path
 *         required: true
 *         default: video
 *       - name: nextPageToken
 *         in: query
 *         required: false
 *       - name: prevPageToken
 *         in: query
 *         required: false
 *       - name: countResult
 *         in: query
 *         required: false
 *     responses:
 *       '200':
 *         descrition: query is succesfull
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   $ref: '#/components/schemas/Items'
 *                 pageInfo:
 *                   $ref: '#/components/schemas/PageInfo'
 *       '401':
 *         descrition: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NoTokenResponse'
 *       '403':
 *         descrition: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NoGoogleTokenResponse'
 */
router.get('/search/:query', queryValidation, authenticate, queryController.search)
/**
 * @swagger
 * /api/query/saveQuery/{id}:
 *   post:
 *     tags: 
 *       - Query
 *     summary: use to save query
 *     descrition: returns saved query
 *     security: 
 *       - bearerAuth: []
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          default: 1
 *     requestBody:
 *       description: parameters of saving
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               maxCount:
 *                 type: integer
 *                 default: 1
 *               sortBy:
 *                 type: string
 *                 default: ''
 *     responses:
 *       '200':
 *         descrition: query has saved succesfull
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   default: 1
 *                 queryId:
 *                   type: string
 *                   default: 1
 *                 createdAt:
 *                   type: string
 *                   default: 2023-11-21T15:12:35.638Z
 *                 updatedAt:
 *                   type: string
 *                   default: 2023-11-21T15:12:35.638Z
 *       '401':
 *         descrition: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NoTokenResponse'
 */
router.post('/saveQuery/:id', savedQueryValidation, authenticate, queryController.saveQuery)
/**
 * @swagger
 * /api/query/editSavedQuery/{id}:
 *   patch:
 *     tags: 
 *       - Query
 *     summary: use to edit query
 *     descrition: returns edited query
 *     security: 
 *       - bearerAuth: []
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          default: 1
 *     requestBody:
 *       description: parameters of saving
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               maxCount:
 *                 type: integer
 *                 default: 1
 *               sortBy:
 *                 type: string
 *                 default: ''
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
 *         descrition: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NoTokenResponse'
 */
router.patch('/editSavedQuery/:id', savedQueryValidation, authenticate, queryController.editSavedQuery)

module.exports = router