'use strict'

module.exports = function(args, models, helpers) {
    const product = models.product;
    const googleSearch = helpers.googleSearchFunctions;
    const scraper = helpers.scraperFunctions;

    let products = [];

    function getUnscrapedProducts() {
        return product.getUnscraped()
            .then(results => {
                products = results;
                return products;
            });
    }

    function getSearchResultHtml(products) {
        let reviewUrls = [];
        products.forEach(product => {
            let searchString = `${product.brand}+${product.model}+review`;
            reviewUrls.push(googleSearch.getSearchUrl(searchString));
        });
        return scraper.getHTML(reviewUrls);
    }

    function extractResultLinks(htmlArray) {
        let allResultLinks = {};

        htmlArray.forEach((html, index) => {
            let resultLinks = [];
            let selector = '.g';
            let googleResults = scraper.searchHTML(html, [selector])[selector];
            
            googleResults.forEach(result => {
                let extractedLinks = googleSearch.getResultLinks(result);
                if (extractedLinks) {
                    resultLinks.push(extractedLinks);
                }
            });
            allResultLinks[products[index]._id] = resultLinks;
        });

        return allResultLinks;
    }

    function getCleanResultLinks(links) {
        return googleSearch.cleanProductLinks(products, links);
    }

    function saveProductLinks(productLinks) {
        let savedLinks = [];
        for (let productId in productLinks) {
            let updatedProduct = product.saveLinks(productId, productLinks[productId])
                .then(results => {
                    console.log(`${productLinks[productId].length} links were stored for prodcutId ${productId}.`);
                    return results;
                });
            savedLinks.push(updatedProduct);
        }
        return googleSearch.returnAllSavedLinks(savedLinks)
            .then(results => { return `${results.length} product(s) were updated with links`; });
    }

    

    function command() {
        getUnscrapedProducts()
            .then(getSearchResultHtml)
            .then(extractResultLinks)
            .then(getCleanResultLinks)
            .then(saveProductLinks)
            .then(successMsg => {
                console.log(successMsg);
                // process.exit();
            })
            .catch(err => {
                console.log(err);
                // process.exit();
            });
    }

    command();
}
