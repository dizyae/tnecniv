'use strict'

module.exports = function(server, jsonFeedController) {
    /**
     * POST /json-feed
     * req must contain a url param in the body
     */
    server.post('/json-feed', (req, res, next) => {
        jsonFeedController.getFeed(req.body)
            .then(feed => { res.send(200, feed) })
            .catch(err => { res.send(500, err) });
        next();
    });

    /**
     * GET /json-feed
     * req must contain a url param in the body
     */
    server.get('/json-feed/google-trends/trending-stories', (req, res, next) => {
        jsonFeedController.getTrendingStories(req.body)
            .then(feed => { res.send(200, feed) })
            .catch(err => { res.send(500, err) });
        next();
    });


}
