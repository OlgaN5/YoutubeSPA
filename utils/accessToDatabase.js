const {
    SavedQuery,
    Query
} = require("../models/assotiation")

class AccessToDatabase {
    async create(Model, data) {
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
        const savedQuery = await SavedQuery.findOne({
            where: {
                id
            },
            raw: true
        })
        const queryId = savedQuery.queryId
        return await Query.update(dataToUpdate, {
            where: {
                id: queryId
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
    async delete(Model,conditions){
        console.log(conditions)
        return await Model.destroy({
            where: conditions,
            // raw: true
        })
    }
}


module.exports = new AccessToDatabase()