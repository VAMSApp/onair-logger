import { QueryOpts } from 'types/QueryOpts';
import { Prisma } from './prisma';
import _ from 'lodash';
import { World } from '@prisma/client';

export const worldRepo = {
    findAll,
    findById,
    findByUuid,
    create,
    update,
    delete: _delete
};

async function findAll(opts?: QueryOpts) {
    const x: World[] | null = await Prisma.world.findMany({...opts});

    return x;
}

async function findByUuid(worldUuid: string, opts?: QueryOpts) {
    if (!worldUuid) throw 'World Id is required';

    const x: World | null = await Prisma.world.findFirst({
        where: {
            Uuid: worldUuid
        },
        ...opts
    });

    return x;
}

async function findById(id: string | number) {
    if (!id) throw 'ID is required';

    const x: World | null = await Prisma.world.findUnique({
        where: {
            Id: (_.isString(id)) ? parseInt(id) : id
        },
    });

    return x;
}

async function create(x: World) {
    if (!x) throw 'Data is required';

    const newX: World | null = await Prisma.world.create({
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

async function update(id: string | number, data: World) {
    if (!id) throw 'ID is required';
    if (!data) throw 'No data is being updated';

    const x: World | null = await Prisma.world.update({
        where: {
            Id: (_.isString(id)) ? parseInt(id) : id
        },
        data: data,
    });

    return x;
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
async function _delete(id: string | number) {
    if (!id) throw 'ID is required';

    const x: World | null = await Prisma.world.delete({
        where: {
            Id: (_.isString(id)) ? parseInt(id) : id
        }
    });

    return x;
}
