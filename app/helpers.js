'use strict'

module.exports = function(env, vendors) {
    const helpers = {
        scraperFunctions: require('./app/scraper/scraper-functions')(vendors),
        jsonFeedFunctions: require('./app/json-feed/json-feed-functions')(vendors),
        productApiFunctions: require('./app/amazon/product-api/product-api-functions')(env, vendors),
        googleSearchFunctions: require('./app/google-search/google-search-functions')(vendors)
    }

    return helpers;
}
