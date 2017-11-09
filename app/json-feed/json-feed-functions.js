'use strict'

module.exports = function(vendors) {
    const request = vendors.request;

    const helper = {
        getFeed: getFeed
    };

    function getFeed(url) {
        return request(url)
            .then(body => { 
                body = body.replace('\n', '').replace(")]}'", '').replace('\"', '"');
                body = JSON.parse(body);
                return body 
            })
            .catch(err => { return err });
    }

    return helper;
}
