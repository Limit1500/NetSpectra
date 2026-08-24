import prisma from "../db";
import { DeviceType } from "../types/device.types";

class DeviceDatabaseService {
  static async getDeviceByMac(macAddress: string) {
    return await prisma.devices.findUnique({
      where: {
        macAddress: macAddress,
      },
    });
  }

  static async createDevice(macAddress: string, vendor: string) {
    await prisma.devices.create({
      data: {
        macAddress: macAddress,
        vendor: vendor,
      },
    });
  }

  static async getOldScoresAndUpdatesNumber(macAddress: string) {
    const data = await DeviceDatabaseService.getDeviceByMac(macAddress);
    const {
      id,
      macAddress: _macAddress,
      vendor,
      deviceType,
      updates,
      lastSeen,
      firstSeen,
      ...oldScores
    } = data!;
    return {
      updates,
      oldScores,
    };
  }

  static async postUpdatedData(
    macAddress: string,
    updatedScores: Record<DeviceType, number>,
    deviceType: DeviceType
  ) {
    await prisma.devices.update({
      where: {
        macAddress,
      },
      data: {
        deviceType,
        updates: {
          increment: 1,
        },
        ...updatedScores,
      },
    });
  }
}

export default DeviceDatabaseService;
