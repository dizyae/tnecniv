/**
 * Use http://docs.aws.amazon.com/AWSECommerceService/latest/DG/LocaleUS.html
 * for amazon search index reference a.k.a arg 1 of this command
 */

module.exports = function(args, models, helpers) {
    const category = args[0];
    const keywords = args[1];
    const productFilter = args[2];
    const amazon = helpers.productApiFunctions;
    const logWriter = helpers.logWriterFunctions;
    
    let log = `KEYWORDS: ${keywords}\n`;
    let itemPage = 1;

    function searchAmazon() {
        amazon.searchByCategory(category, keywords, productFilter, itemPage, true)
            .then(processResults)
            .catch(err => { 
                console.log('Failed to import from Amazon Product Api:', err);
                // process.exit();
            })
    }

    function processResults(results) {
        if (results.length > 0) {
            log += `ITEM PAGE: ${itemPage} \n`;
            log += JSON.stringify(results, null, 4) + '\n\n';
        }
        if (itemPage === 10) {
            logWriter.writeLog(`${category}`, log, () => {
                console.log(`File has been created.`);
                // process.exit();
            });
        }
        itemPage++;
        searchAmazon();
    }

    searchAmazon();
}