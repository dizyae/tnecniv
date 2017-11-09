'use strict'

module.exports = function(vendors) {
    const q = vendors.q;
    const cheerio = vendors.cheerio;
    const request = vendors.requestPromise;
    const _ = vendors.lodash;

    const helper = {
        getHTML: getHTML,
        searchHTML: searchHTML
    };

    function getHTML(input) {
        let url = _.isString(input) ? input : null;
        let options = {
            uri: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
            }
        };

        if (_.isArray(input)) {
            let requests = [];
            input.forEach(url => {
                options.url = url;
                requests.push(request(options));
            });
            return q.all(requests);
        }

        return request(options)
            .then(body => { return [body] })
            .catch(err => { return err });
    }

    function searchHTML(html, selectors) {
        const $ = cheerio.load(html);
        let searchResults = {};
        selectors.forEach(selector => {
            $(selector).each((index, element) => {
                searchResults[selector] = searchResults[selector] ? searchResults[selector] :[];
                searchResults[selector].push($(element).html());
            });
        });
        return searchResults;
    }

    return helper;
}
