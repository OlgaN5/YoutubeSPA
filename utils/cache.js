const NodeCache = require("node-cache");

class Cache {
    ttl = 120 * 1000
    constructor() {
        this.queryCache = new NodeCache({
            stdTTL: 100,
            checkperiod: 120
        });
    }
    setCache = (cache, key, value, ttl) => {
        this.queryCache.set(key, value, ttl || this.ttl)
        return this[cache]
    }
    getCache = (cache, key) => {
        return this[cache].get(key)

    }
}
module.exports = new Cache()