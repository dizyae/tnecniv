'use strict'

module.exports = function(vendors) {
    const cheerio = vendors.cheerio;
    const _ = vendors.lodash;
    const q = vendors.q;

    const helper = {
        getSearchUrl: getSearchUrl,
        getResultLinks: getResultLinks,
        cleanProductLinks: cleanProductLinks,
        returnAllSavedLinks: returnAllSavedLinks
    };

    return helper;

    function getSearchUrl(string) {
        return `https://www.google.com/search?q=${string}&oq=asus&aqs=chrome.0.69i59j69i57j69i59l2j0l2.5700j0j4&sourceid=chrome&ie=UTF-8`;
    }

    function getResultLinks(resultHtml) {
        let $ = cheerio.load(resultHtml);
        let resultLinks = [];
        let link = $('h3').children().first('a');
        let type = getLinkType(link);

        if (type) {
            return {
                type: type,
                url: link.attr('href'),
                title: link.text()
            };
        }
        return false;
    }

    function cleanProductLinks(products, links) {
        const productsById = _.keyBy(products, '_id');
        let cleanedProductLinks = {};
        _.forOwn(links, (productLinks, productId) => {
            const productKeywords = productsById[productId].title.split(' ');
            let cleanLinks = [];
            productLinks.forEach((productLink, index) => {
                const linkKeywords = productLink.title.split(' ');
                let matches = _.intersection(productKeywords, linkKeywords);
                if (matches.length > 1) {
                    cleanLinks.push(productLink);
                }
            });
            cleanedProductLinks[productId] = cleanLinks;
        });
        return cleanedProductLinks;
    }

    function returnAllSavedLinks(savedLinksArray) {
        return q.all(savedLinksArray);

    }

    // Private
    function getLinkType(link) {
        if (!link.attr('href') || !link.text()) {
            return false;
        }
        let url = link.attr('href').toLowerCase();
        let title = link.text().toLowerCase();

        if (url.indexOf('amazon') >= 0) {
            return false;
        }
        if (url.indexOf('youtube') >= 0) {
            return 'video';
        }
        if (url.indexOf('review') >= 0) {
            return 'review';
        }
        if (title.indexOf('review') >= 0) {
            return 'review'
        }

        return false;
    }
}
