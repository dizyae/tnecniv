'use strict'

module.exports = function(baseModel) {
    // inherit from baseModel
    let product = Object.create(baseModel);
    // set model name
    product.modelName = 'products';
    // assign db collection
    product.collection = baseModel.db.collection(product.modelName);

    product.isValid = function isValid(data) {
        if (data.brand && typeof data.brand !== 'string') {
            return false;
        }
        if (data.model && typeof data.model !== 'string') {
            return false;
        }
        if (data.title && typeof data.title !== 'string') {
            return false;
        }
        if (data.upc) {
            return false;
        }
        return true;
    };
    
    product.saveUnique = function getUniqueProducts(productList) {
        let upcList = [];
        let existingUpcs = [];
        productList.forEach(product => {
            upcList.push(product.upc);
        });

        return product.collection.find({upc: { $in: upcList }}, {_id: 0, upc: 1}).toArray()
            .then(results => {
                let uniqueProducts = [];
                results.forEach(document => {
                    existingUpcs.push(document.upc)
                });
                productList.forEach(newProduct => {
                    if (existingUpcs.indexOf(newProduct.upc) < 0) {
                        uniqueProducts.push(newProduct);
                    }
                });
                if (uniqueProducts.length < 1) {
                    return false;
                }
                return product.createMany(uniqueProducts);
            })
            .catch(err => { return err; });
    };

    product.getUnscraped = function getUnscraped() {
        return product.collection.find({ links: { $in: [false, null]}}).toArray()
            .then(results => { return results; })
            .catch(err => { return err; });
    }

    product.saveLinks = function saveLinks(id, links) {
        return product.collection.update({ _id: product.ObjectId(id)}, {$set: {"links": links}}, false, false)
            .then(result => { return result; })
            .catch(err => { return err; });
    }

    return product;
}