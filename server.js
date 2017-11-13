'use strict'

/**
 * Load Environment Vars
 */
const env = require('./env');

/**
 * Load Config
 */
const config = require('./config')(env);

/**
 * Server Dependencies
 */
const restify      = require('restify'),
    restifyPlugins = require('restify-plugins'),
    mongodb        = require('mongodb').MongoClient;

/**
 * Route Vendor Dependencies
 */
const vendors = require('./app/vendors');

/**
 * Initialize Server
 */
const server = restify.createServer({
    name    : config.name,
    version : config.version
});

/**
 * Bundled Plugins (http://restify.com/#bundled-plugins)
 */
server.use(restifyPlugins.bodyParser({ mapParams: true }));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.fullResponse());

/**
 * Lift Server, Connect to DB & Require Route File
 */
server.listen(config.port, () => {

    // establish connection to mongodb atlas
    mongodb.connect(config.db.uri, (err, db) => {

        if (err) {
            console.log('An error occurred while attempting to connect to MongoDB', err);
            process.exit(1);
        }

        console.log(
            '%s v%s ready to accept connections on port %s in %s environment.',
            server.name,
            config.version,
            config.port,
            config.env
        );
        const models = require('./app/models')(db, vendors.ObjectId);
        const helpers = require('./app/helpers')(env, vendors);
        const controllers = require('./app/controllers')(models, helpers);
        require('./app/routes')(server, controllers);
        require(`./app/scheduled-tasks.js`)(models, helpers, vendors.schedule);
    });

});