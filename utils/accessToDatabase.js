const {
    SavedQuery
} = require("../models/assotiation")

class AccessToDatabase {
    async create(Model, data) {
        console.log('!!!!!!!!!!!!!!!!')
        return await Model.create(data)
    }
    async update(Model, id, dataToUpdate) {
        return await Model.update(dataToUpdate, {
            where: {
                id
            },
            raw: true
        })
    }
    async updateQuery(id, dataToUpdate) {
        return await Query.update(dataToUpdate, {
            includes: {
                model: SavedQuery,
                where: {
                    id
                }
            },
            raw: true
        })
    }
    async readOne(Model, conditions) {
        return await Model.findOne({
            where: conditions,
            raw: true
        })
    }
    async readAll(Model, conditions) {
        return await Model.findAll({
            where: conditions,
            raw: true
        })
    }
}


module.exports = new AccessToDatabase()