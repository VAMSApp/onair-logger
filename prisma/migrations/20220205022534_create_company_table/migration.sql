-- CreateTable
CREATE TABLE "Company" (
    "Id" SERIAL NOT NULL,
    "Uuid" TEXT NOT NULL,
    "WorldUuId" TEXT NOT NULL,
    "WorldId" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "AirlineCode" TEXT NOT NULL,
    "Reputation" DECIMAL(65,30),
    "Level" INTEGER,
    "CheckrideLevel" INTEGER,
    "LastConnection" TEXT,
    "LastReportDate" TEXT,
    "CreationDate" TEXT,
    "DifficultyLevel" INTEGER,
    "UTCOffsetinHours" INTEGER,
    "Paused" BOOLEAN DEFAULT false,
    "PausedDate" TEXT,
    "LevelXP" INTEGER,
    "TransportEmployeeInstant" BOOLEAN DEFAULT false,
    "TransportPlayerInstant" BOOLEAN DEFAULT false,
    "ForceTimeInSimulator" BOOLEAN DEFAULT false,
    "UseSmallAirports" BOOLEAN DEFAULT false,
    "UseOnlyVanillaAirports" BOOLEAN DEFAULT false,
    "EnableSkillTree" BOOLEAN DEFAULT false,
    "EnableLandingPenalities" BOOLEAN DEFAULT false,
    "EnableEmployeesFlightDutyAndSleep" BOOLEAN DEFAULT false,
    "AircraftRentLevel" INTEGER,
    "EnableCargosAndChartersLoadingTime" BOOLEAN DEFAULT false,
    "InSurvival" BOOLEAN DEFAULT false,
    "PayBonusFactor" DOUBLE PRECISION,
    "EnableSimFailures" BOOLEAN DEFAULT false,
    "DisableSeatsConfigCheck" BOOLEAN DEFAULT false,
    "RealisticSimProcedures" BOOLEAN DEFAULT false,
    "TravelTokens" INTEGER,
    "CurrentBadgeId" TEXT,
    "CurrentBadgeUrl" TEXT,
    "CurrentBadgeName" TEXT,
    "LastWeeklyManagementsPaymentDate" TEXT,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_Uuid_key" ON "Company"("Uuid");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_WorldId_fkey" FOREIGN KEY ("WorldId") REFERENCES "World"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
