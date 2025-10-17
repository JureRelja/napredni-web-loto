/*
  Warnings:

  - The primary key for the `Tickets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `publicLink` on the `Tickets` table. All the data in the column will be lost.
  - The `id` column on the `Tickets` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[uuid]` on the table `Tickets` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uuid` to the `Tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tickets" DROP CONSTRAINT "Tickets_pkey",
DROP COLUMN "publicLink",
ADD COLUMN     "uuid" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Tickets_pkey" PRIMARY KEY ("id");

-- AlterTable
CREATE SEQUENCE users_id_seq;
ALTER TABLE "Users" ALTER COLUMN "id" SET DEFAULT nextval('users_id_seq');
ALTER SEQUENCE users_id_seq OWNED BY "Users"."id";

-- CreateIndex
CREATE UNIQUE INDEX "Tickets_uuid_key" ON "Tickets"("uuid");
