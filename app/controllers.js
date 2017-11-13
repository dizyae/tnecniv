'use strict'

module.exports = function(models, helpers) {
    const controllers = {
        scraper: require('./scraper/scraper-controller')(models.url, helpers),
        jsonFeed: require('./json-feed/json-feed-controller')(helpers)
    };

    return controllers;
}
