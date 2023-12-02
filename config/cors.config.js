const cors = require('cors')
module.exports = function corsUse(app) {
    app.use(cors({
        origin: '*',
        credentials: true,
        methods: 'GET,PUT,PATCH,POST,DELETE',
        allowedHeaders: ['Authorization', 'Content-Type'],
        exposedHeaders: ['Authorization', 'Content-Type']
    }))
}