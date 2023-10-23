const accessToDatabase = require("../utils/accessToDatabase")
const {
    User
} = require('../models/assotiation')
class LoginService {
    async getUser(parameters) {
        const identificator = parameters.login ? 'login' : 'email'
        return accessToDatabase.readOne(User, {
            [identificator]: parameters[identificator]
        })

    }
}
module.exports = new LoginService()