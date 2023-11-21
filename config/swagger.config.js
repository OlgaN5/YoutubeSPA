const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
class SwaggerConfig {
    getSwaggerOptions() {
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
        return swaggerOptions
    }
    initSwaggerDoc(app) {
        const swaggerOptions = this.getSwaggerOptions()
        const swaggerDocs = swaggerJSDoc(swaggerOptions)
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
        return swaggerDocs
    }
}

module.exports = new SwaggerConfig()