'use strict'

module.exports = function(db, ObjectId) {
    const baseModel = {
        db: db,
        ObjectId: ObjectId,
        create: create,
        createMany: createMany
    };

    function create(data) {
        if (this.isValid(data)) {
            data = Object.assign({}, data, {
                created: new Date(),
                updated: new Date()
            });
            
            return this.collection.insertOne(data)
                .then(doc => { return doc.ops[0] })
                .catch(err => { return err });
        }
    }

    function createMany(data) {
        let newDocuments = [];
        data.forEach(newDocument => {
            if (this.isValid(newDocument)) {
                data = Object.assign({}, data, {
                    created: new Date(),
                    updated: new Date()
                });
                newDocuments.push(newDocument);
                return;
            }
            console.log(`Invalid ${this.modelName} document:`, newDocument);
        });

        if(newDocuments.length > 0) {
            return this.collection.insertMany(newDocuments)
                .then(doc => { return doc })
                .catch(err => { return err });
        }
    }

    return baseModel;
}