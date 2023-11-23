const db = require('./database')

async function connect() {
    await db.authenticate()
    // await db.sync({
    //     force: true
    // })
}

module.exports = connect