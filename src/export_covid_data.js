var utils = require('./utils');

const genderPercent = async () => {
    const data = await utils.getData('columnCharts.php');
    const mappedData = data.aktiv_gjinia.map(x => {
        return {
            gender: x.name,
            percent_value: x.y
        };
    });

    utils.writeCsv(mappedData, 'gender_percent.csv');
}

const agePercent = async () => {
    const data = await utils.getData('columnCharts.php');
    const mappedData = data.aktiv_grupmoshe.map(x => {
        return {
            age: x.name,
            percent_value: x.y
        };
    });

    utils.writeCsv(mappedData, 'age_percent.csv');
}

const recoveredAgePercent = async () => {
    const data = await utils.getData('columnCharts.php');
    const mappedData = data.sheruar_grupmoshe.map(x => {
        return {
            age: x.name,
            percent_value: x.y
        };
    });

    utils.writeCsv(mappedData, 'recovered_age_percent.csv');
}

const recoveredDistrictPercent = async () => {
    const data = await utils.getData('columnCharts.php');
    const mappedData = data.sheruar_vendbanim.map(x => {
        return {
            district: x.name,
            percent_value: x.y
        };
    });

    utils.writeCsv(mappedData, 'recovered_district_percent.csv');
}

const districtSummary = async () => {
    const data = await utils.getData('qarqet.php');
    const mappedData = data.map(x => {
        return {
            id: x.ID,
            name: x.qarku,
            active: x.akt_pozitive,
            confinement: x.izolim,
            latitude: x.lat,
            longitude: x.lon,
            hospitalized: x.mjekim_spitalor,
            total: x.raste_gjithsej,
            recovered: x.sheruar,
            intensive_care: x.terapi_int,
            tests: x.teste,
            deaths: x.vdekur
        };
    });

    utils.writeCsv(mappedData, 'district_summary.csv');
}

const granularData = async () => {
    const data = await utils.getData('stats.php');
    const dates = data.kategorite;
    const activeCases = data.raste_aktive;
    const newCases = data.raste_te_reja;
    const cumulativeCases = data.raste_kumulative;
    const recovered = data.sheruar;
    const deaths = data.vdekje_kumulative;

    const mappedData = [];
    dates.forEach((date, index) => {
        var day = {
            date: date,
            active: activeCases[index] - (activeCases[index - 1] ? activeCases[index - 1] : 0),
            active_cumulative: activeCases[index],
            new_cases: newCases[index],
            cumulative_cases: cumulativeCases[index],
            recovered: recovered[index] - (recovered[index - 1] ? recovered[index - 1] : 0),
            recovered_cumulative: recovered[index],
            deaths: deaths[index] - (deaths[index - 1] ? deaths[index - 1] : 0),
            deaths_cumulative: deaths[index]
        };
        mappedData.push(day);
    });

    utils.writeCsv(mappedData, 'daily_data.csv');

    const summary = data.tabs;

    const summaryData = [{
        total_cases: summary.raste_gjithesej,
        total_cases_yesterday: summary.raste_gjithesej_dje,
        total_active_cases: summary.raste_aktive,
        active_cases_yesterday: summary.raste_aktive_dje,
        total_recovered: summary.te_sheruar,
        recovered_yesterday: summary.te_sheruar_dje,
        total_deaths: summary.te_vdekur,
        deaths_yesterday: summary.te_vdekur_dje,
        total_tests: summary.teste_gjithesej,
        tests_yesterday: summary.teste_gjithesej_dje
    }];

    utils.writeCsv(summaryData, 'summary_data.csv');

}

module.exports = {
    genderPercent,
    agePercent,
    recoveredAgePercent,
    recoveredDistrictPercent,
    districtSummary,
    granularData
}