/*
  Warnings:

  - You are about to drop the `deviceTraffic` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "deviceTraffic";

-- CreateTable
CREATE TABLE "TrafficDevices" (
    "id" SERIAL NOT NULL,
    "macAddress" TEXT NOT NULL,
    "vendor" TEXT NOT NULL,

    CONSTRAINT "TrafficDevices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Score" (
    "id" SERIAL NOT NULL,
    "iotScore" INTEGER NOT NULL,
    "mobileScore" INTEGER NOT NULL,
    "desktopScore" INTEGER NOT NULL,
    "tvScore" INTEGER NOT NULL,
    "deviceTrafficId" INTEGER NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TrafficDevices_macAddress_key" ON "TrafficDevices"("macAddress");

-- CreateIndex
CREATE UNIQUE INDEX "TrafficDevices_vendor_key" ON "TrafficDevices"("vendor");

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_deviceTrafficId_fkey" FOREIGN KEY ("deviceTrafficId") REFERENCES "TrafficDevices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
