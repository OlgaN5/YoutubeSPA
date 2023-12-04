const dotenv = require('dotenv')
dotenv.config()

const Sequelize = require('sequelize')

// module.exports = new Sequelize(process.env.DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST,
//     dialect: process.env.DIALECT
// })

module.exports = new Sequelize('verceldb', 'default', 'TRCz0QXj9btD', {
    host: 'ep-cold-flower-38311113-pooler.us-east-1.postgres.vercel-storage.com',
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
})
