const sanitizer = require('./sanitizer')
class Structure {
    async transformate(videos, pagination, pageInfo) {
        videos.pageInfo = pageInfo
        videos.pageInfo.pagination = pagination
        videos = sanitizer.sanitizeVideos(videos)
        return videos
    }
}

module.exports = new Structure()