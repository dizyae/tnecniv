'use strict'

module.exports = function(urlModel, helpers) {
    const scraperFunctions = helpers.scraperFunctions;

    const controller = {
        post: post
    };

    function post(requestBody) {
        return scraperFunctions.getHTML(requestBody.url)
            .then(html => {
                if (requestBody.searchFor) {
                    return scraperFunctions.searchHTML(html, requestBody.searchFor);
                }
                return html;
            });
    };

    return controller;
}
