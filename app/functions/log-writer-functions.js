module.exports = function(vendors) {
    const fs = vendors.fs;
    const dateTime = vendors.dateTime;

    const helper = {
        writeLog: writeLog
    };

    function writeLog(logName, data, callback) {
        let timeStamp = dateTime.create().format('Y-m-d H:M:S');
        const fileName = `${logName}_${timeStamp}`;
        return fs.writeFile(`./logs/${fileName}.log`, data, callback);
    }

    return helper;
    
}
