/*
  Warnings:

  - Added the required column `numberRooms` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `squares` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "numberRooms" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "squares" DOUBLE PRECISION NOT NULL;
