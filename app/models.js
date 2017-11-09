'use strict'

module.exports = function(db, ObjectId) {
    const baseModel = require('./base-model')(db, ObjectId);

    const models = {
        url: require('./app/scraper/url-model')(baseModel),
        product: require('./app/amazon/amazon-product-model')(baseModel)
    };

    return models;
}