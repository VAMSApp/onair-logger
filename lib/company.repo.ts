import _ from 'lodash';
import { Company, World } from '@prisma/client';
import { QueryOpts } from 'types/QueryOpts';
import { Prisma } from './prisma';
import { Company as OnAirCompany, } from 'onair-api';
import { worldRepo } from '.';

export const companyRepo = {
    findAll,
    findById,
    findByUuid,
    create,
    update,
    delete: _delete
};

async function findAll(opts?: QueryOpts) {
    const x: Company[] | null = await Prisma.company.findMany({...opts});

    return x;
}

async function findByUuid(companyUuid: string, opts?: QueryOpts) {
    if (!companyUuid) throw 'Company Id is required';

    const x: Company | null = await Prisma.company.findFirst({
        where: {
            Uuid: companyUuid
        },
        ...opts
    });

    return x;
}

async function findById(id: string | number) {
    if (!id) throw 'ID is required';

    const x: Company | null = await Prisma.company.findUnique({
        where: {
            Id: (_.isString(id)) ? parseInt(id) : id
        },
    });

    return x;
}

async function create(x: OnAirCompany) {
    if (!x) throw 'Data is required';

    const world: World | null = await worldRepo.findByUuid(x.WorldId);

    const newX: Company | null = await Prisma.company.create({
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

async function update(id: string | number, data: OnAirCompany) {
    if (!id) throw 'ID is required';
    if (!data) throw 'No data is being updated';

    const x: Company | null = await Prisma.company.update({
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
async function _delete(id: string | number) {
    if (!id) throw 'ID is required';

    const x = await Prisma.company.delete({
        where: {
            Id: (_.isString(id)) ? parseInt(id) : id
        }
    });

    return x;
}
