'use strict'

module.exports = function(server, scraperController) {
    /**
     * POST /scrape
     * res should contain a url param in the body
     */
    server.post('/scrape', (req, res, next) => {

        scraperController.post(req.body)
            .then(result => { 
                res.send(200, result);
                next();
            })
            .catch(err => {
                res.send(500, err);
                next();
            });
        
    });
}
