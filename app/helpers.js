'use strict'

module.exports = function(env, vendors) {
    const helpers = {
        scraperFunctions: require('./scraper/scraper-functions')(vendors),
        jsonFeedFunctions: require('./json-feed/json-feed-functions')(vendors),
        productApiFunctions: require('./amazon/product-api/product-api-functions')(env, vendors),
        googleSearchFunctions: require('./google-search/google-search-functions')(vendors),
        logWriterFunctions: require('./functions/log-writer-functions')(vendors)
    }

    return helpers;
}
