'use strict'

module.exports = function(baseModel) {
    // inherit from baseModel
    let url = Object.create(baseModel);
    // assign db collection
    url.collection = baseModel.db.collection('urls');

    url.isValid = function isValid(data) {
        if (typeof data.url !== 'string') {
            return false;
        }
        return true;
    } 

    return url;
}