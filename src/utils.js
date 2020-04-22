const fetch = require("node-fetch");
const fastcsv = require('fast-csv');
const fs = require('fs');
const { format } = require('date-fns');

const config = require('../config.json');

const getData = async urlSlug => {
    const url = config.baseUrl + urlSlug;
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json
    } catch (error) {
        console.log(error);
    }
}

const writeCsv = async (data, fileName) => {
    const date = new Date();

    //create execution date folder
    const dataDir = './data/' + format(date, 'yyyy-MM-dd') + '/';
    fs.promises.mkdir(dataDir, { recursive: true }).catch(console.error);
    const ws = fs.createWriteStream(dataDir + fileName);
    fastcsv.write(data, { headers: true }).pipe(ws);
}

module.exports = {
    getData,
    writeCsv
}