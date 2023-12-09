const express = require('express')
const queryController = require('../controllers/query.controller')
const authenticate = require('../utils/authenticate')
const router = express.Router()

const {
    queryValidation,
    savedQueryValidation,
    idValidation
} = require('../utils/validations')

/**
 * @swagger
 * /api/query/search:
 *   get:
 *     tags: 
 *       - Query
 *     summary: use to search videos
 *     description: gets query parameters returns result of this query
 *     security: 
 *       - bearerAuth: []
 *     parameters:
 *       - name: query
 *         in: query
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
 *       - name: sortBy
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
 *                 queryId:
 *                   type: string
 *                   default: 3
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
router.get('/search', queryValidation, authenticate, queryController.search)
/**
 * @swagger
 * /api/query/getFavourites:
 *   get:
 *     tags: 
 *       - Query
 *     summary: use to get videos
 *     description: returns the saved queries of this user
 *     security: 
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         descrition: query is succesfull
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   default: 4
 *                 query:
 *                   $ref: '#/components/schemas/QueryParamsWithText'                 
 *       '401':
 *         descrition: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NoTokenResponse'
 */
router.get('/getFavourites', authenticate, queryController.getFavourites)
/**
 * @swagger
 * /api/query/saveQuery/{id}:
 *   post:
 *     tags: 
 *       - Query
 *     summary: use to save query
 *     description: gets id of the query, saves it and returns the saved query
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
 *               title:
 *                 type: string
 *                 default: name
 *               maxCount:
 *                 type: integer
 *                 default: 1
 *               sortBy:
 *                 type: string
 *                 default: ''
 *     responses:
 *       '201':
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
 *                 data:
 *                   $ref: '#/components/schemas/QueryParams'
 *       '400':
 *         descrition: query has saved succesfull
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   default: User has no query with such id
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
 *     description: gets new parameters, updates the query and returns the edited query
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
 *             $ref: '#/components/schemas/QueryParams'
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
/**
 * @swagger
 * /api/query/deleteSavedQuery/{id}:
 *   delete:
 *     tags: 
 *       - Query
 *     summary: use to delete saved query
 *     description: deletes the query and returns it
 *     security: 
 *       - bearerAuth: []
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          default: 1
 *     responses:
 *       '200':
 *         descrition: query has deleted succesfull
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   default: deleted successful
 *                 countDeleted:
 *                   type: integer
 *                   default: 1
 *       '401':
 *         descrition: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NoTokenResponse'
 */
router.delete('/deleteSavedQuery/:id', idValidation, authenticate, queryController.deleteSavedQuery)
module.exports = router