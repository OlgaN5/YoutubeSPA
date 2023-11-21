const db = require('./database')
const {
    Query,
    SavedQuery,
    User
} = require('../models/assotiation')

async function connect() {
    await db.authenticate()
    // await db.sync({
    //     force: true
    // })
}

module.exports = connect