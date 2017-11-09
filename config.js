'use strict'

module.exports = function(env) {
    const config = {
        name: 'scraper',
        version: '0.0.1',
        env: env.environment,
        port: env.port,
        db: {
            uri: `mongodb://${env.mongodbUser}:${env.mongodbPass}@cluster0-shard-00-00-qc8ju.mongodb.net:27017,cluster0-shard-00-01-qc8ju.mongodb.net:27017,cluster0-shard-00-02-qc8ju.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`,
        }
    }
    return config;
}