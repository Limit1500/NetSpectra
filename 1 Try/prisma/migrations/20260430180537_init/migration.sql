-- CreateTable
CREATE TABLE "deviceTraffic" (
    "id" SERIAL NOT NULL,
    "macAddress" TEXT NOT NULL,
    "laptop" INTEGER NOT NULL,
    "desktop" INTEGER NOT NULL,
    "phone" INTEGER NOT NULL,
    "smart_tv" INTEGER NOT NULL,
    "iot" INTEGER NOT NULL,

    CONSTRAINT "deviceTraffic_pkey" PRIMARY KEY ("id")
);
