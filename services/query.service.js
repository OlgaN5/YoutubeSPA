const accessToDatabase = require('../utils/accessToDatabase')
const axios = require('axios')

const {
    Query,
    SavedQuery
} = require('../models/assotiation')
const sanitizer = require('../utils/sanitizer')
class QueryService {
    async search(user, query, prevPageToken, nextPageToken) {
        const userGoogleToken = user.googleToken
        console.log(userGoogleToken)
        if (!userGoogleToken) {
            return null
        }
        const searchParams = {
            q: query,
            key: userGoogleToken,
            part: 'snippet',
            maxResults: 10
        }
        const pageToken = prevPageToken || nextPageToken
        if (pageToken) {
            searchParams.pageToken = pageToken
        }
        const searchResult = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: searchParams
        })
        const pagination = {
            nextPageToken: searchResult.data.nextPageToken || null,
            prevPageToken: searchResult.data.nextPageToken || null
        }
        // console.log(videos)
        const videosId = searchResult.data.items.map((item) => item.id.videoId).join(',')
        let videos = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
            params: {
                key: userGoogleToken,
                part: 'snippet,statistics',
                id: videosId,
            }
        })

        videos.data.pageInfo.pagination = pagination
        videos = await sanitizer.sanitizeVideos(videos)
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