const _ = require('lodash')
class Sanitizer {
    sanitizeVideos(videos) {
        videos = _.omit(videos, ['kind', 'etag'])
        const filtereditems = videos.items.map(item => {
            let newItem = _.omit(item, ['kind', 'etag'])
            newItem.snippet = _.omit(newItem.snippet, ['publishedAt', 'tags', 'categoryId', 'liveBroadcastContent', 'localized', 'channelTitle', 'defaultLanguage', 'defaultAudioLanguage'])
            // newItem.snippet = _.mapKeys(newItem.snippet, function (value, key) {
            //     return key === 'thumbnails' ? 'image' : key
            // })
            return newItem
        })
        videos.items = filtereditems
        return videos
    }
    deletePassword(user) {
        return _.omit(user.dataValues, ['password'])
    }
}
module.exports = new Sanitizer()