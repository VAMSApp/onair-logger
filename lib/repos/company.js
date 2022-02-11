const _ = require('lodash');
const Prisma = require('../prisma').default;
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
    const x = await Prisma.company.findMany({...opts});

    return x;
}

async function findByUuid(companyUuid, opts) {
    if (!companyUuid) throw 'Company Id is required';

    const x= await Prisma.company.findFirst({
        where: {
            Uuid: companyUuid
        },
        ...opts
    });

    return x;
}

async function findById(id) {
    if (!id) throw 'ID is required';

    const x= await Prisma.company.findUnique({
        where: {
            Id: (_.isString(id)) ? parseInt(id) : id
        },
    });

    return x;
}

async function create(x) {
    if (!x) throw 'Data is required';

    const world = await worldRepo.findByUuid(x.WorldId);

    const newX= await Prisma.company.create({
        data: {
            Uuid: x.Id,
            WorldUuId: x.WorldId,
            WorldId: world?.Id || 1,
            Name: x.Name,
            AirlineCode: x.AirlineCode,
            Reputation: parseFloat(x.Reputation.toFixed(3)),
            Level: x.Level,
            CheckrideLevel: x.CheckrideLevel,
            LastConnection: x.LastConnection,
            LastReportDate: x.LastReportDate,
            CreationDate: x.CreationDate,
            DifficultyLevel: x.DifficultyLevel,
            UTCOffsetinHours: x.UTCOffsetinHours,
            Paused: x.Paused,
            PausedDate: x.PausedDate,
            LevelXP: x.LevelXP,
            TransportEmployeeInstant: x.TransportEmployeeInstant,
            TransportPlayerInstant: x.TransportPlayerInstant,
            ForceTimeInSimulator: x.ForceTimeInSimulator,
            UseSmallAirports: x.UseSmallAirports,
            UseOnlyVanillaAirports: x.UseOnlyVanillaAirports,
            EnableSkillTree: x.EnableSkillTree,
            EnableLandingPenalities: x.EnableLandingPenalities,
            EnableEmployeesFlightDutyAndSleep: x.EnableEmployeesFlightDutyAndSleep,
            AircraftRentLevel: x.AircraftRentLevel,
            EnableCargosAndChartersLoadingTime: x.EnableCargosAndChartersLoadingTime,
            InSurvival: x.InSurvival,
            PayBonusFactor: x.PayBonusFactor,
            EnableSimFailures: x.EnableSimFailures,
            DisableSeatsConfigCheck: x.DisableSeatsConfigCheck,
            RealisticSimProcedures: x.RealisticSimProcedures,
            TravelTokens: x.TravelTokens,
            CurrentBadgeId: x.CurrentBadgeId,
            CurrentBadgeUrl: x.CurrentBadgeUrl,
            CurrentBadgeName: x.CurrentBadgeName,
            LastWeeklyManagementsPaymentDate: x.LastWeeklyManagementsPaymentDate,
        }
    });

    return newX;
}

async function update(id, data) {
    if (!id) throw 'ID is required';
    if (!data) throw 'No data is being updated';

    const x= await Prisma.company.update({
        where: {
            Id: (_.isString(id)) ? parseInt(id) : id
        },
        data: {
            Reputation: parseFloat(data.Reputation.toFixed(3)),
            Level: data.Level,
            CheckrideLevel: data.CheckrideLevel,
            LastConnection: data.LastConnection,
            LastReportDate: data.LastReportDate,
            CreationDate: data.CreationDate,
            DifficultyLevel: data.DifficultyLevel,
            UTCOffsetinHours: data.UTCOffsetinHours,
            Paused: data.Paused,
            PausedDate: data.PausedDate,
            LevelXP: data.LevelXP,
            TransportEmployeeInstant: data.TransportEmployeeInstant,
            TransportPlayerInstant: data.TransportPlayerInstant,
            ForceTimeInSimulator: data.ForceTimeInSimulator,
            UseSmallAirports: data.UseSmallAirports,
            UseOnlyVanillaAirports: data.UseOnlyVanillaAirports,
            EnableSkillTree: data.EnableSkillTree,
            EnableLandingPenalities: data.EnableLandingPenalities,
            EnableEmployeesFlightDutyAndSleep: data.EnableEmployeesFlightDutyAndSleep,
            AircraftRentLevel: data.AircraftRentLevel,
            EnableCargosAndChartersLoadingTime: data.EnableCargosAndChartersLoadingTime,
            InSurvival: data.InSurvival,
            PayBonusFactor: data.PayBonusFactor,
            EnableSimFailures: data.EnableSimFailures,
            DisableSeatsConfigCheck: data.DisableSeatsConfigCheck,
            RealisticSimProcedures: data.RealisticSimProcedures,
            TravelTokens: data.TravelTokens,
            CurrentBadgeId: data.CurrentBadgeId,
            CurrentBadgeUrl: data.CurrentBadgeUrl,
            CurrentBadgeName: data.CurrentBadgeName,
            LastWeeklyManagementsPaymentDate: data.LastWeeklyManagementsPaymentDate,
        },
    });

    return x;
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
async function _delete(id) {
    if (!id) throw 'ID is required';

    const x = await Prisma.company.delete({
        where: {
            Id: (_.isString(id)) ? parseInt(id) : id
        }
    });

    return x;
}
