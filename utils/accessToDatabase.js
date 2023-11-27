const {
    SavedQuery,
    Query,
    User
} = require("../models/assotiation")
const sequelize = require('sequelize')
class AccessToDatabase {
    async create(Model, data) {
        // try {
        return await Model.create(data)
        // } catch {
        // return null
        // }
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
            // where: {
            //     userId: 1
            // },
            include: {
                model: Query,
                where: conditions,
                attributes: ['text', 'maxCount', 'sortBy']
                // sequelize.fn(
                //     'json_build_object',
                //     sequelize.literal('"text"'),
                //     sequelize.col('query.text')
                // ), 'result'
            },
            attributes: ['id'],
            raw: true
        })
        console.log(result)
        return result
    }
    async delete(Model, conditions) {
        console.log(conditions)
        return await Model.destroy({
            where: conditions,
            // raw: true
        })
    }
}


module.exports = new AccessToDatabase()