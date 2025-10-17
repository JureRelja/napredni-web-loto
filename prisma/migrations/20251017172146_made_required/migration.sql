/*
  Warnings:

  - Made the column `qrCodeImageLink` on table `Tickets` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Tickets" ALTER COLUMN "qrCodeImageLink" SET NOT NULL;
