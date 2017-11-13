'use strict'

module.exports = function(models, helpers, schedule) {
    function run(command, args) {
        require(`./../commands/${command}.js`)(args, models, helpers);
    }

    schedule.scheduleJob('0 0/20/40 * * * *', () => {
        const productImportArgs = [
            {
                category: 'PCHardware', 
                keywords: 'netbook',
                filter: 'laptop'
            },
            {
                category: 'PCHardware', 
                keywords: 'samsung,monitor',
                filter: 'monitor'
            },
            {
                category: 'PCHardware', 
                keywords: 'macbook,notbook',
                filter: 'laptop'
            },
        ];
        productImportArgs.forEach((args) => {
            const commandArgs = [args.category, args.keywords, args.filter];
            run('import-products', commandArgs);
        });
    });
}