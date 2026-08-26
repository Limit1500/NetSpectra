import prisma from "../db";
import { DeviceType } from "../types/device.types";

class DeviceDatabaseService {
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
    await prisma.devices.create({
      data: {
        macAddress: macAddress,
        vendor: vendor,
      },
    });
  }

  static async getOldScoresAndLastDecay(macAddress: string) {
    const data = await DeviceDatabaseService.getDeviceByMac(macAddress);
    const {
      id,
      macAddress: _macAddress,
      vendor,
      deviceType,
      updates,
      lastSeen,
      firstSeen,
      lastDecay,
      ...oldScores
    } = data!;
    return {
      lastDecay,
      oldScores,
    };
  }

  static async postUpdatedData(
    macAddress: string,
    updatedScores: Record<DeviceType, number>,
    deviceType: DeviceType,
    lastDecay: Date,
    confidence: number
  ) {
    await prisma.devices.update({
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

export default DeviceDatabaseService;
