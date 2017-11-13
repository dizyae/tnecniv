'use strict'

module.exports = function(db, ObjectId) {
    const baseModel = require('./base-model')(db, ObjectId);

    const models = {
        url: require('./scraper/url-model')(baseModel),
        product: require('./amazon/amazon-product-model')(baseModel)
    };

    return models;
}