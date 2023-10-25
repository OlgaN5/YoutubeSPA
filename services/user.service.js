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
    async createUser(data) {
        return accessToDatabase.create(User, data)
    }
    async findUserByConditions(conditions) {
        return accessToDatabase.readOne(User, conditions)
    }
}
module.exports = new UserService()