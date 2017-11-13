'use strict'

module.exports = function(server, controllers) {
    require('./scraper/scraper-routes')(server, controllers.scraper);
    require('./json-feed/json-feed-routes')(server, controllers.jsonFeed);
}