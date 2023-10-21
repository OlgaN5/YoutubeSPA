const accessToDatabase = require("../utils/accessToDatabase")
const {
    User
} = require('../models/assotiation')

class RegisterService {
    async createUser(data) {
        return accessToDatabase.create(User, data)
    }
    async findUserByConditions(conditions) {
        return accessToDatabase.readOne(User, conditions)
    }
}

module.exports = new RegisterService()