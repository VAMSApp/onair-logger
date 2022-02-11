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
        console.log(`Started refreshCompanyDetails`);

        return Api
            .getCompany()
            .then(async function processCompany(onair_company) {
                const { AirlineCode, Id, WorldId, } = onair_company;

                console.log(`  Started Processing ${AirlineCode} Company`);
                console.log(`    Looking up world by World ID: ${WorldId}`);

                const world = await worldRepo.findByUuid(WorldId);

                if (world) {
                    console.log(`    World found: ${world.ShortName}`);
                }

                console.log(`    Trying to find the Company in the database by the provided Company UUID: ${Id}`);
                let company = await companyRepo.findByUuid(Id);

                if (company) {
                    console.log(`    Company UUID ${company.Uuid} found in database.`);

                    console.log(`    Refreshing ${company.AirlineCode} (${company.Id}) with the latest data.`);
                    company = await companyRepo.update(company.Id, onair_company);

                } else {
                    console.log(`    Company UUID ${Id} was not found in the database.`);

                    console.log('    Creating the new Company');
                    company = await companyRepo.create(onair_company);

                    console.log(`    Company ${company?.AirlineCode} created. Company ID is ${company?.Id}.`);
                }

                console.log(`  Finished Processing Company (${company.Id}) ${AirlineCode}.`);


                return company;
            })
            .then(() => {
                console.log('Finished refreshCompanyDetails()');
                console.log();
            })
            .catch(function errorProcessingCompany(err) {
                console.error('Error processing company');
                console.error(err);
                throw err;
            });
    }

    async function refreshCompanyFleet() {
        console.log(`Started refreshCompanyFleet`);

        let Created = [];
        let Updated = [];

        return Api
            .getCompanyFleet()
            .then(async function processCompanyFleet(onair_fleet) {
                onair_fleet.forEach(async function eachAircraft (oa_aircraft) {

                    const {
                        Id,
                        AircraftTypeId,
                        AircraftClassId,
                        Identifier,
                    } = oa_aircraft;

                    // try to find the aircraft by Uuid in the database

                    // if aircraft exists
                        // update it
                        // push the aircraft Id into the Updated array
                    // otherwise
                        // create it
                        // push the aircraft Id into the Created array

                });

            })
            .then(() => {
                console.log('Finished refreshCompanyFleet()');
                console.log();
            })
            .catch(function errorProcessingCompanyFleet(err) {
                console.error('Error processing Company Fleet');
                console.error(err);
                throw err;
            });
    }

    const runList = [
        refreshCompanyDetails,
        refreshCompanyFleet
    ];

    // run concurrently
    // await Promise.all(runList.map(fn => fn()))

    // run in series
    for (const fn of runList) {
        await fn();
    }

})();


// Id: 'd8a921a5-4774-4530-b75e-14b41545cabc',
// AircraftTypeId: 'da06adca-0e5b-43f9-b317-fa3a89d7fc05',
// AircraftClassId: '04422853-db1a-425b-85c8-fdf3fdb54c66',
// Identifier:
