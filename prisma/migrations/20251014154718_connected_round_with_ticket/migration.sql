/*
  Warnings:

  - You are about to drop the column `qrCodeLink` on the `Tickets` table. All the data in the column will be lost.
  - Added the required column `lotteryRoundId` to the `Tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicLink` to the `Tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qrCodeImageLink` to the `Tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tickets" DROP COLUMN "qrCodeLink",
ADD COLUMN     "lotteryRoundId" INTEGER NOT NULL,
ADD COLUMN     "publicLink" TEXT NOT NULL,
ADD COLUMN     "qrCodeImageLink" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_lotteryRoundId_fkey" FOREIGN KEY ("lotteryRoundId") REFERENCES "LotteryRounds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
