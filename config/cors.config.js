const cors = require('cors')
module.exports = function corsUse(app) {
    app.use(cors({
        origin: '*',
        credentials: true,
        allowedHeaders: ['Authorization', 'Content-Type'],
        exposedHeaders: ['Authorization', 'Content-Type']
    }))
}