const Sequelize = require('sequelize')
const db = require('../config/database')
module.exports = db.define('savedQuery', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    queryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        referenses: {
            model: 'query',
            key: 'id'
        }
    }
})