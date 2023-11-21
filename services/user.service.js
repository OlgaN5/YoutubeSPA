const accessToDatabase = require("../utils/accessToDatabase")
const {
    User
} = require('../models/assotiation')
const _ = require('lodash')
class UserService {
    async aggGoogleToken(id, key) {
        return await accessToDatabase.update(User, id, {
            googleToken: key
        })
    }
    async createUser(data) {
        const user = await accessToDatabase.create(User, data)
        return _.omit(user.dataValues, ['password'])
    }
    async findUserByConditions(conditions) {
        return await accessToDatabase.readOne(User, conditions)
    }
}
module.exports = new UserService()