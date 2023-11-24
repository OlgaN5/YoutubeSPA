const sentryInit = require('./sentry.config')
const cors = require('./cors.config')
const swaggerConfig = require('./swagger.config')

module.exports = async function applyConfigSettings(app) {
    sentryInit(app)
    cors(app)
    // app.use(express.json())
    swaggerConfig.initSwaggerDoc(app)
}