import { worldRepo, companyRepo } from './lib';
import { World, Company, } from '@prisma/client';
import OnAirApi, { Api, Company as OnAirCompany, OnAirApiConfig, } from 'onair-api';


(async function main() {
    const apiConfig: OnAirApiConfig = {
        apiKey: 'd17ea885-aad5-429b-9297-fe2e6deca5d9',
        companyId: 'c3d8e51d-f2e9-4918-a286-c3f2cd5ab141',
        vaId: 'cd7df229-c5ff-4528-b74f-688b98c80afe',
    };

    const Api: Api = new OnAirApi(apiConfig);

    Api
        .getCompany()
        .then(async function processCompany(onair_company: OnAirCompany) {
            const { AirlineCode, Id, WorldId, } = onair_company;

            console.log(`Started Processing ${AirlineCode} Company`);
            console.log(`  Looking up world by World ID: ${WorldId}`);

            const world: World | null = await worldRepo.findByUuid(WorldId);

            if (world) {
                console.log(`  World found: ${world.ShortName}`);
            }

            console.log(`  Trying to find the Company in the database by the provided Company UUID: ${Id}`);
            let company: Company | null = await companyRepo.findByUuid(Id);

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
        });

})();
