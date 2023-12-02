const accessToDatabase = require('../utils/accessToDatabase')
const axios = require('axios')
const cache = require('../utils/cache')
const {
    Query,
    SavedQuery
} = require('../models/assotiation')
const structure = require('../utils/structure')
class QueryService {
    async getVideos(videosId, userGoogleToken) {
        let videos = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
            params: {
                key: userGoogleToken,
                part: 'snippet,statistics',
                id: videosId,
            }
        })
        return videos.data
    }
    async search(query, pageToken, userGoogleToken, countResult, sortBy) {
        if (pageToken) {
            searchParams.pageToken = pageToken
        }
        console.log(sortBy)
        const searchParams = {
            q: query,
            key: userGoogleToken,
            part: 'snippet',
            maxResults: countResult || 10,
            order: sortBy || 'relevance'
        }
        const searchResult = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: searchParams
        })

        return searchResult.data
    }

    async getResults(user, query, prevPageToken, nextPageToken, countResult, sortBy) {
        const userGoogleToken = user.googleToken
        const uniqueSearchLine = query+prevPageToken+nextPageToken+countResult+sortBy
        if (!userGoogleToken) {
            return null
        }
        const createdQuery = await accessToDatabase.create(Query, {
            text: query,
            userId: user.id
        })
        const queryFromCache = cache.getCache('queryCache', uniqueSearchLine)
        if (queryFromCache) {
            queryFromCache.queryId = createdQuery.dataValues.id
            return queryFromCache
        }
        const pageToken = prevPageToken || nextPageToken
        const searchResult = await this.search(query, pageToken, userGoogleToken, countResult, sortBy)
        const pagination = {
            nextPageToken: searchResult.nextPageToken || null,
            prevPageToken: searchResult.prevPageToken || null
        }
        const pageInfo = searchResult.pageInfo
        const videosId = searchResult.items.map((item) => item.id.videoId).join(',')
        let videos = await this.getVideos(videosId, userGoogleToken)
        videos = await structure.transformate(videos, pagination, pageInfo)
        cache.setCache('queryCache', uniqueSearchLine, videos)
        console.log(createdQuery.dataValues)
        videos.queryId = createdQuery.dataValues.id
        return videos
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
    async getFavourites(id) {
        return await accessToDatabase.readAll(SavedQuery, {
            userId: id
        })
    }
    async deleteSavedQuery(id) {
        return await accessToDatabase.delete(SavedQuery, {
            id
        })

    }

}
module.exports = new QueryService()