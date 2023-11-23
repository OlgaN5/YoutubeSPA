const _ = require('lodash')
class Sanitizer {
    async sanitizeVideos(videos) {
        videos.data = _.omit(videos.data, ['kind', 'etag'])
        const filtereditems = videos.data.items.map(item => {
            let newItem = _.omit(item, ['kind', 'etag'])
            newItem.snippet = _.omit(newItem.snippet, ['publishedAt', 'thumbnails', 'tags', 'categoryId', 'liveBroadcastContent', 'localized', 'channelTitle', 'defaultLanguage', 'defaultAudioLanguage'])
            return newItem
        })
        videos.data.items = filtereditems
        return videos
    }
}
module.exports = new Sanitizer()