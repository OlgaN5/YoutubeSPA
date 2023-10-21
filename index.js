const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const indexRouter = require('./routes/index.router')

const app = express()
const port = process.env.PORT || 4000
// app.set("port", port);
app.use(express.json())

const db = require('./config/database')
const {
    Query,
    SavedQuery,
    User
} = require('./models/assotiation')


//swagger
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            version: '1.0.0',
            title: 'YoutubeSPA',
            description: 'Customer API information',
            contact: {
                name: 'Olya'
            },
            servers: ["http://localhost:3000"]
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    name: 'Authorization'
                }
            }
        }

    },
    apis: ['./routes/*.js']
}
const swaggerDocs = swaggerJSDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))


//main
// async function main() {
//database
// await db.authenticate()
// await User.sync()
// await Query.sync()
// await SavedQuery.sync()

//start server

const server = app.listen(port, () => console.log(`port started on port ${port}`))

//routing
app.use('/api', indexRouter)
// }
// main()

module.exports = {
    app,
    server
}