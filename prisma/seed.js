/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const seedData = {
    worlds: [
        // bin
        {
            Uuid: 'bin',
            Name: 'Fail Bin',
            IsSurvival: false,
            IsHumanOnly: false,
            ShortName: 'Fail Bin'
        },
        // clear-sky
        {
            Uuid: 'd72139d8-c66e-49a6-8af1-d259081b0e7c',
            Name: 'Clear Sky',
            IsSurvival: false,
            IsHumanOnly: false,
            ShortName: 'Clear Sky'
        },
        // cumulus
        {
            Uuid: 'ad3ec8a4-246e-4abb-84a9-9dbc43bb6ae6',
            Name: 'Cumulus',
            IsSurvival: false,
            IsHumanOnly: false,
            ShortName: 'Cumulus'
        },
        // stratus
        {
            Uuid: 'be6ab20f-809f-4c57-aaa6-9e78a3022ba8',
            Name: 'Stratus',
            IsSurvival: false,
            IsHumanOnly: false,
            ShortName: 'Stratus'
        },
        // thunder
        {
            Uuid: 'c83eb5d5-9dc5-452f-b261-69b45cb0951b',
            Name: 'Thunder',
            IsSurvival: true,
            IsHumanOnly: true,
            ShortName: 'Thunder'
        },
    ],
    aircraftClasses: [
        {
            Uuid: '04422853-db1a-425b-85c8-fdf3fdb54c66',
            ShortName: 'HEAVYJET',
            Name: 'Heavy Jet'
        },
        {
            Uuid: '607d854a-18f7-42ae-99f6-63b4b7f07f1a',
            ShortName: 'METL',
            Name: 'Multi-engine TurboProp Land'
        },
        {
            Uuid: '3460504f-db41-4ea6-a765-2a6867a2f88d',
            ShortName: 'JET',
            Name: 'Jet'
        },
        {
            Uuid: 'b4a35db6-f20a-4320-8f0c-ec9956da11a6',
            ShortName: 'SETL',
            Name: 'Single Engine TurboProp Land'
        },

    ]
};

async function main() {
    let worlds = [],
        aircraftClasses = [];

    seedData.worlds.forEach(async function (w) {
        let world = await prisma.world.upsert({
            where: {
                Uuid: w.Uuid
            },
            create: w,
            update: {}
        });

        worlds.push(world);
        console.log(`World ${world.ShortName} Upserted`);
    });

    //   seedData.aircraftClasses.forEach(async function(ac) {
    //     let aircraftClass = await prisma.aircraftClass.upsert({
    //         where: {
    //         Uuid: ac.Uuid
    //         },
    //         create: ac,
    //         update: {},
    //     })

    //     aircraftClasses.push(aircraftClass)
    //     console.log(`Aircraft Class ${aircraftClass.ShortName} Upserted`)
    //   })
}



main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
