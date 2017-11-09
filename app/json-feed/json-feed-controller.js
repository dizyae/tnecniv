'use strict'

module.exports = function(helpers) {
    const jsonFeedFunctions = helpers.jsonFeedFunctions;

    const controller = {
        getFeed: getFeed,
        getTrendingStories: getTrendingStories
    };

    function getFeed(requestBody) {
        return jsonFeedFunctions.getFeed(requestBody.url)
            .then(feed => {
                return feed;
            });
    };

    function getTrendingStories() {
        let url = 'https://trends.google.com/trends/api/stories/latest?hl=en-US&tz=420&cat=all&fi=0&fs=0&geo=US&ri=300&rs=15&sort=0';
        return getFeed({url: url})
            .then(feed => {
                return feed.storySummaries.trendingStories
            });
        
    }

    return controller;
}
