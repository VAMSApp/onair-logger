const _ = require('lodash');
const Prisma = require('../prisma');

module.exports = {
    findAll,
    findById,
    findByUuid,
    create,
    update,
    delete: _delete
};

async function findAll(opts) {
    const x = await Prisma.world.findMany({...opts});

    return x;
}

async function findByUuid(worldUuid, opts) {
    if (!worldUuid) throw 'World Id is required';

    console.log(worldUuid);

    const x = await Prisma.world.findFirst({
        where: {
            Uuid: worldUuid
        },
        ...opts
    });

    return x;
}

async function findById(id) {
    if (!id) throw 'ID is required';

    const x = await Prisma.world.findUnique({
        where: {
            Id: (_.isString(id)) ? parseInt(id) : id
        },
    });

    return x;
}

async function create(x) {
    if (!x) throw 'Data is required';

    const newX = await Prisma.world.create({
        data: {
            Uuid: x.Uuid,
            Name: x.Name,
            IsSurvival: x.IsSurvival,
            IsHumanOnly: x.IsHumanOnly,
            ShortName: x.ShortName,
            EnableEconomicBalance: x.EnableEconomicBalance,
        }
    });

    return newX;
}

async function update(id, data) {
    if (!id) throw 'ID is required';
    if (!data) throw 'No data is being updated';

    const x = await Prisma.world.update({
        where: {
            Id: (_.isString(id)) ? parseInt(id) : id
        },
        data: data,
    });

    return x;
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
async function _delete(id) {
    if (!id) throw 'ID is required';

    const x = await Prisma.world.delete({
        where: {
            Id: (_.isString(id)) ? parseInt(id) : id
        }
    });

    return x;
}
