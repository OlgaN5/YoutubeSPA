const accessToDatabase = require("../utils/accessToDatabase")
const {
    User
} = require('../models/assotiation')
class LoginService {
    async getUser(login, email) {
        const identificator = login || email
        return accessToDatabase.readOne(User, {
            [identificator]: identificator
        })

    }
}
module.exports = new LoginService()