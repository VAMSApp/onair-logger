-- CreateTable
CREATE TABLE "Aircraft" (
    "Id" SERIAL NOT NULL,
    "Uuid" TEXT NOT NULL,
    "CompanyUuid" TEXT NOT NULL,
    "CompanyId" INTEGER NOT NULL,
    "WorldUuId" TEXT NOT NULL,
    "WorldId" INTEGER NOT NULL,
    "Identifier" TEXT NOT NULL,

    CONSTRAINT "Aircraft_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Aircraft_Uuid_key" ON "Aircraft"("Uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Aircraft_Identifier_key" ON "Aircraft"("Identifier");

-- AddForeignKey
ALTER TABLE "Aircraft" ADD CONSTRAINT "Aircraft_WorldId_fkey" FOREIGN KEY ("WorldId") REFERENCES "World"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aircraft" ADD CONSTRAINT "Aircraft_CompanyId_fkey" FOREIGN KEY ("CompanyId") REFERENCES "Company"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
