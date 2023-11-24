require('dotenv').config()

const express = require('express')
const indexRouter = require('./routes/index.router')
const connectDatabase = require('./config/databaseConnect')
const applyConfigSettings = require('./config/config')

let server
let app

async function main() {
    const port = process.env.PORT || 4000
    app = express()
    await applyConfigSettings(app)
    app.use(express.json())
    await connectDatabase()
    server = app.listen(port, () => console.log(`port started on port ${port}`))
    app.use('/api', indexRouter)
}
main()

module.exports = {
    app,
    server
}