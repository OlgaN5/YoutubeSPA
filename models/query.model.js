const Sequelize = require('sequelize')
const db = require('../config/database')
module.exports = db.define('query', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    text: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    maxCount: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false
    },
    sortBy: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        referenses: {
            model: 'user',
            key: 'id'
        }
    },
})