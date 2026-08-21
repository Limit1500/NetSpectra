import prisma from "../db";
import { DeviceType } from "../types";

class DatabaseService {
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

  static async getUpdatedData(
    macAddress: string,
    newScores: Record<DeviceType, number>,
  ) {
    const oldData = await DatabaseService.getDeviceByMac(macAddress);

    for (const key of Object.values(DeviceType)) {
      oldData![key] += newScores[key];
    }

    return oldData;
  }

  static async postUpdatedData(macAddress: string, data: any) {
    const { id, macAddress: _macAddress, ...updateData } = data;
    await prisma.devices.update({
      where: {
        macAddress: macAddress,
      },
      data: {
        ...updateData,
      },
    });
  }
}

export default DatabaseService;
