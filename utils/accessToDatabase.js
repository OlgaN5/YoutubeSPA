const {
    SavedQuery,
    Query,
    User
} = require("../models/assotiation")
const sequelize = require('sequelize')
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
        console.log(conditions)
        const result = await SavedQuery.findAll({

            include: {
                model: Query,
                where: conditions,
                attributes: ['title','text', 'maxCount', 'sortBy']
            },
            attributes: ['id'],
        })
        console.log('11111111')
        console.log(result)
        return result
    }
    async delete(Model, conditions) {
        console.log(conditions)
        return await Model.destroy({
            where: conditions,
        })
    }
}


module.exports = new AccessToDatabase()