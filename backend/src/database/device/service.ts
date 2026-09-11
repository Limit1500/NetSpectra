import prisma from "../database";
import { DeviceTypes } from "./type";

class DatabaseDeviceService {
  static async getAllDevices() {
    return await prisma.devices.findMany({
      select: {
        id: true,
        macAddress: true,
        vendor: true,
        deviceType: true,
        updates: true,
        lastSeen: true,
        firstSeen: true,
      },
    });
  }

  static async getDeviceByMac(macAddress: string) {
    return await prisma.devices.findUnique({
      where: {
        macAddress: macAddress,
      },
    });
  }

  static async createDevice(macAddress: string, vendor: string) {
    return await prisma.devices.create({
      data: {
        macAddress: macAddress,
        vendor: vendor,
      },
    });
  }

  static async getSavedScoresAndLastDecay(macAddress: string) {
    const data = await DatabaseDeviceService.getDeviceByMac(macAddress);
    const {
      id,
      macAddress: _macAddress,
      vendor,
      deviceType,
      updates,
      lastSeen,
      firstSeen,
      lastDecay,
      confidence,
      ...databaseDeviceScores
    } = data!;
    return {
      lastDecay,
      databaseDeviceScores,
    };
  }

  static async postUpdatedData(
    macAddress: string,
    updatedScores: Record<DeviceTypes, number>,
    deviceType: DeviceTypes,
    lastDecay: Date,
    confidence: number
  ) {
    return await prisma.devices.update({
      where: {
        macAddress,
      },
      data: {
        deviceType,
        confidence,
        lastDecay,
        updates: {
          increment: 1,
        },
        ...updatedScores,
      },
    });
  }
}

export default DatabaseDeviceService;
