'use strict'

module.exports = function(env, vendors) {
    const client = vendors.amazonProductApi.createClient({
        awsId: env.awsId,
        awsSecret: env.awsSecret,
        awsTag: env.awsTag
    });
    const productGroupFilterMap = {
        laptop: [
            'NOTEBOOK_COMPUTER',
            'TABLET_COMPUTER'
        ],
        desktop: [
            'PERSONAL_COMPUTER'
        ],
        computerAccessory: [
            'COMPUTER_DRIVE_OR_STORAGE',
            'NETWORKING_DEVICE',
            'WIRELESS_ACCESSORY',
            'COMPUTER_DRIVE_OR_STORAGE',
            'COMPUTER_SPEAKER'
        ],
        monitor: [
            'MONITOR'
        ]
    }

    const helper = {
        searchByCategory: searchByCategory 
    };

    return helper;

    function searchByCategory(category, keywords, filter = null, itemPage, isResearch = false) {
        return client.itemSearch({
            searchIndex: category,
            keywords: keywords,
            sort: 'salesrank',
            itemPage: itemPage
        })
            .then(results => {
                if (isResearch) {
                    return getItemAttributes(results);
                }
                return formatResults(results, filter);
            })
            .catch(err => {
                return err;
            });
    }

    // Private
    function formatResults(results, filter) {
        let formattedResults = [];
        results.forEach(result => {
            let itemAttrs = result.ItemAttributes[0];
            if (passesProductFilter(itemAttrs.ProductTypeName[0], filter)) {
                let formattedResult = {
                    brand: itemAttrs.Brand ? itemAttrs.Brand[0] : null,
                    model: itemAttrs.Model ? itemAttrs.Model[0] : null,
                    title: itemAttrs.Title ? itemAttrs.Title[0] : null,
                    productType: itemAttrs.ProductTypeName ? itemAttrs.ProductTypeName[0] : null,
                    upc: itemAttrs.UPC ? itemAttrs.UPC[0] : null,
                    formattedPrice: itemAttrs.ListPrice ? itemAttrs.ListPrice[0].FormattedPrice[0] : null,
                    price: itemAttrs.ListPrice ? itemAttrs.ListPrice[0].Amount[0] : null
                };
                formattedResults.push(formattedResult);
            }
        });

        return formattedResults;
    }

    function getItemAttributes(results) {
        var ResultItemAttrs = [];
        results.forEach(result => {
            let itemAttrs = result.ItemAttributes[0];
            ResultItemAttrs.push(itemAttrs);
        });
        return ResultItemAttrs;
    }

    function passesProductFilter(productType, filter) {
        if (!filter) {
            return true;
        }
        if (productGroupFilterMap[filter].indexOf(productType) >= 0) {
            return true;
        }
        return false;
    }
}
