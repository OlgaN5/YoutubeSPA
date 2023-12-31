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
        const searchParams = {
            q: query,
            type: 'video',
            key: userGoogleToken,
            part: 'snippet',
            maxResults: countResult || 10,
            order: sortBy || 'relevance'
        }
        if (pageToken) {
            searchParams.pageToken = pageToken
        }
        const searchResult = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: searchParams
        })
        console.log(searchResult.data.items[0].id)
        return searchResult.data
    }

    async getResults(user, query, prevPageToken, nextPageToken, countResult, sortBy) {
        const userGoogleToken = user.googleToken
        const uniqueSearchLine = query + ' ' + prevPageToken + ' ' + nextPageToken + ' ' + countResult + ' ' + sortBy
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
            console.log(queryFromCache)
            return queryFromCache
        }
        const pageToken = prevPageToken || nextPageToken
        const searchResult = await this.search(query, pageToken, userGoogleToken, countResult, sortBy)
        const pagination = {
            nextPageToken: searchResult.nextPageToken || null,
            prevPageToken: searchResult.prevPageToken || null
        }
        console.log('pagination')
        console.log(pagination)
        const pageInfo = searchResult.pageInfo
        const videosId = searchResult.items.map((item) => {
            return item.id.videoId
        }).join(',')
        let videos = await this.getVideos(videosId, userGoogleToken)
        videos = await structure.transformate(videos, pagination, pageInfo)
        cache.setCache('queryCache', uniqueSearchLine, videos)
        videos.queryId = createdQuery.dataValues.id
        return videos
    }

    async saveQuery(id, dataToUpdate, userId) {
        const queryById = await accessToDatabase.readOne(Query, {
            id
        })
        console.log('queryById')
        console.log(userId != queryById.userId)
        if (userId != queryById.userId) return null
        console.log('here')

        const result = await accessToDatabase.create(SavedQuery, {
            queryId: id
        })
        result.dataValues.data = dataToUpdate
        console.log(result)
        await accessToDatabase.update(Query, id, dataToUpdate)
        return result
    }
    async updateQuery(savedQueryId, dataToUpdate) {
        await accessToDatabase.updateQuery(savedQueryId, dataToUpdate)
        return dataToUpdate
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