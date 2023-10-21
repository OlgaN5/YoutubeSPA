const dotenv = require('dotenv')
dotenv.config()

const Sequelize = require('sequelize')

module.exports = new Sequelize(process.env.DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DIALECT
})