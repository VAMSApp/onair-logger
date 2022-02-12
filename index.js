require('dotenv/config');
const { OnAirApi } = require('onair-api');
const worldRepo = require('./lib/repos/world');
const companyRepo = require('./lib/repos/company');
const aircraftRepo = require('./lib/repos/aircraft');

(async function main() {
    const apiConfig = {
        apiKey: process.env.ONAIR_API_KEY,
        companyId: process.env.ONAIR_COMPANY_ID,
        vaId: process.env.ONAIR_VA_ID,
    };

    const Api = new OnAirApi(apiConfig);

    let Company = null;
    let World = null;
    let Fleet = [];

    async function refreshCompanyDetails() {
        console.log(`Started refreshCompanyDetails`);

        return Api
            .getCompany()
            .then(async function processCompany(onair_company) {
                const { AirlineCode, Id, WorldId, } = onair_company;

                console.log(`  Started Processing ${AirlineCode} Company`);
                console.log(`    Looking up world by World ID: ${WorldId}`);

                World = await worldRepo.findByUuid(WorldId);

                if (World) {
                    console.log(`    World found: ${World.ShortName}`);
                }

                console.log(`    Trying to find the Company in the database by the provided Company UUID: ${Id}`);
                Company = await companyRepo.findByUuid(Id);

                if (Company) {
                    console.log(`    Company UUID ${Company.Uuid} found in database.`);

                    console.log(`    Refreshing ${Company.AirlineCode} (${Company.Id}) with the latest data.`);
                    Company = await companyRepo.update(Company.Id, onair_company);

                } else {
                    console.log(`    Company UUID ${Id} was not found in the database.`);

                    console.log('    Creating the new Company');
                    Company = await companyRepo.create(onair_company);

                    console.log(`    Company ${Company?.AirlineCode} created. Company ID is ${Company?.Id}.`);
                }

                console.log(`  Finished Processing Company (${Company.Id}) ${AirlineCode}.`);

                return Company;
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

        return Api
            .getCompanyFleet()
            .then(async function processCompanyFleet(onair_fleet) {
                let Updated = [];
                let Created = [];
                let updatedCount = 0;
                let createdCount = 0;
                let TotalCount = onair_fleet.length;

                console.log(`  Received ${TotalCount} aircraft, Looping through each`);

                onair_fleet.forEach(async function eachAircraft (oa_aircraft) {
                    console.log(`    Looking up Aircraft by UUid '${oa_aircraft.Id}'`);

                    const translated = {
                        Uuid: oa_aircraft.Id,
                        CompanyUuid: Company.CompanyUuid,
                        CompanyId: Company.Id,
                        WorldUuId: World.Uuid,
                        WorldId: World.Id,
                        Identifier: oa_aircraft.Identifier,
                    }

                    console.log(`    Trying to find ${translated.Identifier} in the database.`);

                    // try to find the aircraft by Uuid in the database
                    let aircraft = await aircraftRepo.findByUuid(translated.Uuid);

                    // if aircraft exists
                    if (aircraft) {
                        console.log(`    Aircraft ${aircraft.Uuid} found in database.`);
                        // update it
                        console.log(`    Refreshing ${aircraft.Identifier} (${aircraft.Id} aircraft with latest data`);

                        aircraft = await aircraftRepo.update(aircraft.Id, translated);
                        // push the aircraft Id into the Updated array
                        Updated.push(aircraft);
                        console.log(updatedCount);
                        updatedCount = updatedCount++;

                    // otherwise
                    } else {
                        console.log(`Aircraft UUID ${translated.Uuid} was not found in the database.`)
                        // create it
                        console.log(`Creating the new Aircraft`);
                        aircraft = await aircraftRepo.create(translated);

                        console.log(`Aircraft ${aircraft.Identifier} created, Aircraft ID is ${aircraft.Id}`);
                        // push the aircraft Id into the Created array
                        Created.push(aircraft);
                        createdCount = createdCount++;
                    }
                });

                return {
                    updatedCount,
                    Updated,
                    createdCount,
                    Created,
                }
            })
            .then(({ Updated, updatedCount, Created, createdCount, }) => {
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
