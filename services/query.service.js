const accessToDatabase = require('../utils/accessToDatabase')
const axios = require('axios')
const {
    Query,
    SavedQuery
} = require('../models/assotiation')
class QueryService {
    async getVideos(user, query, prevPageToken, nextPageToken) {
        const params = {
            q: query,
            key: user.googleToken,
            part: 'id',
            maxResults: 10
        }
        const pageToken = prevPageToken || nextPageToken
        if (pageToken) {
            params.pageToken = pageToken
        }
        const videos = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params
        })
        accessToDatabase.create(Query, {
            text: query,
            userId: user.id
        })
        return videos.data
    }

    async saveQuery(id, dataToUpdate) {
        const result = await accessToDatabase.create(SavedQuery, {
            queryId: id
        })
        await accessToDatabase.update(Query, id, dataToUpdate)
        return result
    }
    async updateQuery(savedQueryId, dataToUpdate) {
        return accessToDatabase.updateQuery(savedQueryId, dataToUpdate)
    }
}
module.exports = new QueryService()