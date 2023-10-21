const accessToDatabase = require("../utils/accessToDatabase")
const {
    User
} = require('../models/assotiation')
class UserService {
    async aggGoogleToken(id, key) {
        return await accessToDatabase.update(User, id, {
            googleToken: key
        })
    }
    async findUser(id) {
        return await accessToDatabase.readOne(User, {
            id
        })
    }
}
module.exports = new UserService()