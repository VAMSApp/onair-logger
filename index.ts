import OnAirApi, { Company, OnAirApiConfig, } from 'onair-api'


(async function main() {
    const apiConfig: OnAirApiConfig = {
        apiKey: 'd17ea885-aad5-429b-9297-fe2e6deca5d9',
        world: 'cumulus',
        companyId: 'c3d8e51d-f2e9-4918-a286-c3f2cd5ab141',
        vaId: 'cd7df229-c5ff-4528-b74f-688b98c80afe',
    };
    
    const Api: OnAirApi = new OnAirApi(apiConfig);
    

})()