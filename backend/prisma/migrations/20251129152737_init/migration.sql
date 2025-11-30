/*
  Warnings:

  - Added the required column `cliente` to the `Aeronave` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataEntrega` to the `Aeronave` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `aeronave` ADD COLUMN `cliente` VARCHAR(191) NOT NULL,
    ADD COLUMN `dataEntrega` DATETIME(3) NOT NULL;
