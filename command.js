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
 * Database Dependencies
 */
const mongodb = require('mongodb').MongoClient;

/**
 * Vendor Dependencies
 */
const vendors = require('./app/vendors');

/**
 * Command and Arguments
 */
const command = process.argv[2];  // gets command name
const args = process.argv.slice(3); // gets command arguments

// establish connection to mongodb atlas
mongodb.connect(config.db.uri, (err, db) => {

    if (err) {
        console.log('An error occurred while attempting to connect to MongoDB', err);
        process.exit(1);
    }

    console.log('Connected to MongoDB');

    const models = require('./app/models')(db, vendors.ObjectId);
    const helpers = require('./app/helpers')(env, vendors);
    require(`./commands/${command}`)(args, models, helpers);
});
