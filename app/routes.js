'use strict'

module.exports = function(server, controllers) {
    require('./app/scraper/scraper-routes')(server, controllers.scraper);
    require('./app/json-feed/json-feed-routes')(server, controllers.jsonFeed);
}