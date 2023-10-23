const dotenv = require('dotenv')
dotenv.config()

const Sequelize = require('sequelize')

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
