const Query = require('./query.model')
const SavedQuery = require('./savedQuery.model')
const User = require('./user.model')

User.hasMany(Query, {
    foreignKey: 'userId'
})
Query.belongsTo(User, {
    foreignKey: 'userId'
})
Query.hasOne(SavedQuery, {
    foreignKey: 'queryId'
})
SavedQuery.belongsTo(Query, {
    foreignKey: 'queryId'
})

module.exports = {
    Query,
    SavedQuery,
    User
}