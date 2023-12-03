const Sequelize = require('sequelize')
const db = require('../config/database')
module.exports = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    googleToken: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false
    }
})