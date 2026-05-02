/*
  Warnings:

  - A unique constraint covering the columns `[macAddress]` on the table `deviceTraffic` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[vendor]` on the table `deviceTraffic` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `vendor` to the `deviceTraffic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "deviceTraffic" ADD COLUMN     "vendor" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "deviceTraffic_macAddress_key" ON "deviceTraffic"("macAddress");

-- CreateIndex
CREATE UNIQUE INDEX "deviceTraffic_vendor_key" ON "deviceTraffic"("vendor");
