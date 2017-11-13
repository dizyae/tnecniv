'use strict'

module.exports = function(args, models, helpers) {
    const category = args[0];
    const keywords = args[1];
    const productFilter = args[2];
    const amazon = helpers.productApiFunctions;
    const product = models.product;
    
    let itemPage = 1;

    function searchAmazon() {
        amazon.searchByCategory(category, keywords, productFilter, itemPage)
            .then(processResults)
            .catch(err => { 
                console.log('Failed to import from Amazon Product Api:', err);
                // process.exit();
            })
    }

    function processResults(results) {
        if (results.length > 0) {
            return saveUniqueProducts(results);
        }
        if (itemPage === 10) {
            throw  `No Results for args: ${JSON.stringify(args)}`;
            return;
        }
        itemPage++;
        searchAmazon();
    }

    function saveUniqueProducts(results) {
        product.saveUnique(results)
            .then(savedProducts => {
                if (!savedProducts) {
                    itemPage++;
                    searchAmazon();
                    return;
                }
                console.log('Products Saved:', savedProducts);
                // process.exit(); 
            })
            .catch(err => { 
                return err;
            });
    }

    searchAmazon();
}
