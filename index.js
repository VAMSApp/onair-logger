require('dotenv/config');
const { OnAirApi } = require('onair-api');
const worldRepo = require('./lib/repos/world');
const companyRepo = require('./lib/repos/company');

(async function main() {
    const apiConfig = {
        apiKey: process.env.ONAIR_API_KEY,
        companyId: process.env.ONAIR_COMPANY_ID,
        vaId: process.env.ONAIR_VA_ID,
    };

    const Api = new OnAirApi(apiConfig);

    async function refreshCompanyDetails() {
        return Api
            .getCompany()
            .then(async function processCompany(onair_company) {
                const { AirlineCode, Id, WorldId, } = onair_company;

                console.log(`Started Processing ${AirlineCode} Company`);
                console.log(`  Looking up world by World ID: ${WorldId}`);

                const world = await worldRepo.findByUuid(WorldId);

                if (world) {
                    console.log(`  World found: ${world.ShortName}`);
                }

                console.log(`  Trying to find the Company in the database by the provided Company UUID: ${Id}`);
                let company = await companyRepo.findByUuid(Id);

                if (company) {
                    console.log(`  Company UUID ${company.Uuid} found in database.`);

                    console.log(`  Refreshing ${company.AirlineCode} (${company.Id}) with the latest data.`);
                    company = await companyRepo.update(company.Id, onair_company);

                } else {
                    console.log(`  Company UUID ${Id} was not found in the database.`);

                    console.log('  Creating the new Company');
                    company = await companyRepo.create(onair_company);

                    console.log(`  Company ${company?.AirlineCode} created. Company ID is ${company?.Id}.`);
                }

                console.log(`Finished Processing Company (${company.Id}) ${AirlineCode}.`);

                return company;
            })
            .catch(function errorProcessingCompany(err) {
                console.error('Error processing company');
                console.error(err);
            });
    }

    async function refreshCompanyFleet() {
        console.log('refreshCompanyFleet finished.')
    }

    const runList = [
        refreshCompanyDetails,
        refreshCompanyFleet
    ];

    await Promise.all(runList.map(fn => fn()))
})();
