const fs = require('fs');

var exportData = require('./src/export_covid_data');

//import active_gender_percent
exportData.genderPercent();

//import age_percent
exportData.agePercent();

//import recovered_age_percent
exportData.recoveredAgePercent();

//import recovered_distrinct_percent
exportData.recoveredDistrictPercent();

//import districts
exportData.districtSummary();

//import stats
exportData.granularData();

//writes the last update datetime
fs.writeFile('last_update.txt', (new Date()).toISOString(), function (err) {
    if (err)
        return console.log(err);
});