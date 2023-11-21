const cors = require('cors')
module.exports = function corsUse(app) {
    app.use(cors({
        // origin: 'http://localhost:3000',
        allowedHeaders: ['Authorization', 'Content-Type']
    }))
}