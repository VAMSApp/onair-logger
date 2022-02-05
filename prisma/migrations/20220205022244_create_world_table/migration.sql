-- CreateTable
CREATE TABLE "World" (
    "Id" SERIAL NOT NULL,
    "Uuid" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "IsSurvival" BOOLEAN NOT NULL DEFAULT false,
    "IsHumanOnly" BOOLEAN NOT NULL DEFAULT false,
    "ShortName" TEXT NOT NULL,
    "EnableEconomicBalance" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "World_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "World_Uuid_key" ON "World"("Uuid");
