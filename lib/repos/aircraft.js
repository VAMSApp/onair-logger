const _ = require('lodash');
const Prisma = require('../prisma');
const worldRepo =  require('./world');

module.exports = {
    findAll,
    findById,
    findByUuid,
    create,
    update,
    delete: _delete
};

async function findAll(opts) {
    const x = await Prisma.aircraft.findMany({...opts});

    return x;
}

async function findByUuid(aircraftUuid, opts) {
    if (!aircraftUuid) throw 'Aircraft UuId is required';

    const x = await Prisma.aircraft.findFirst({
        where: {
            Uuid: aircraftUuid
        },
        ...opts
    });

    return x;
}

async function findById(id) {
    if (!id) throw 'ID is required';

    const x = await Prisma.aircraft.findUnique({
        where: {
            Id: (_.isString(id)) ? parseInt(id) : id
        },
    });

    return x;
}

async function create(x) {
    if (!x) throw 'Data is required';

    const newX = await Prisma.aircraft.create({
        data: {
            Uuid: x.Uuid,
            CompanyUuid: x.CompanyUuid,
            CompanyId: x.CompanyId,
            WorldUuId: x.WorldUuId,
            WorldId: x.WorldId,
            Identifier: x.Identifier,
        }
    });

    return newX;
}

async function update(id, data) {
    if (!id) throw 'ID is required';
    if (!data) throw 'No data is being updated';

    const x = await Prisma.aircraft.update({
        where: {
            Id: (_.isString(id)) ? parseInt(id) : id
        },
        data: {
            CompanyUuid: data.CompanyUuid,
            CompanyId: data.CompanyId,
            Identifier: data.Identifier,
        },
    });

    return x;
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
async function _delete(id) {
    if (!id) throw 'ID is required';

    const x = await Prisma.aircraft.delete({
        where: {
            Id: (_.isString(id)) ? parseInt(id) : id
        }
    });

    return x;
}
