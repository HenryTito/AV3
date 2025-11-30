/*
  Warnings:

  - A unique constraint covering the columns `[codigo]` on the table `Aeronave` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Aeronave_codigo_key` ON `Aeronave`(`codigo`);
