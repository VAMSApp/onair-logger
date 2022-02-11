/*
  Warnings:

  - You are about to alter the column `Reputation` on the `Company` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "Reputation" SET DATA TYPE DOUBLE PRECISION;
