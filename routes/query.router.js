const express = require('express')
const queryController = require('../controllers/query.controller')
const authenticate = require('../utils/authenticate')
const router = express.Router()

const {
    body,
    param
} = require('express-validator')


const queryValidation = param('query').notEmpty().escape()
const idValidation = param('id').notEmpty().escape()
const parametersQueryValidation = [
    body('maxCount').optional().isInt(),
    body('sortBy').optional().isString(),
]
const savedQueryValidation = parametersQueryValidation.concat(idValidation)

/**
 * @swagger
 * /api/query/getVideos/{query}:
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
 *     responses:
 *       '200':
 *         descrition: query is succesfull
 */
router.get('/getVideos/:query', queryValidation, authenticate, queryController.getVideos)
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
 *                 default: null
 *               sortBy:
 *                 type: string
 *                 default: ''
 *     responses:
 *       '200':
 *         descrition: query has saved succesfull
 */
router.post('/saveQuery/:id', savedQueryValidation, authenticate, queryController.saveQuery)
/**
 * @swagger
 * /api/query/editSavedQuery/{id}:
 *   post:
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
 *                 default: null
 *               sortBy:
 *                 type: string
 *                 default: ''
 *     responses:
 *       '200':
 *         descrition: query has saved succesfull
 */
router.post('/editSavedQuery/:id', savedQueryValidation, authenticate, queryController.editSavedQuery)

module.exports = router