'use strict'

module.exports = function(models, helpers) {
    const controllers = {
        scraper: require('./app/scraper/scraper-controller')(models.url, helpers),
        jsonFeed: require('./app/json-feed/json-feed-controller')(helpers)
    };

    return controllers;
}
