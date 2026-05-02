import type { Scores } from "../models/traffic.models.js";
import { prisma } from "./prisma.js";

class DeviceTrafficStore {
  async addNewDevice(macAddress: string, vendor: string) {
    await prisma.trafficDevices.create({ data: { macAddress, vendor } });
  }

  async getDeviceByMac(mac: string) {
    return prisma.trafficDevices.findUnique({ where: { macAddress: mac } });
  }

  async getDeviceScoresAvgByMac(mac: string) {
    return prisma.score.aggregate({
      where: { deviceTraffic: { macAddress: mac } },
      _avg: {
        iotScore: true,
        mobileScore: true,
        desktopScore: true,
        tvScore: true,
      },
    });
  }

  async getDeviceId(macAddress: string) {
    const device = await prisma.trafficDevices.findUnique({
      where: { macAddress: macAddress },
      select: {
        id: true,
      },
    });
    return device?.id;
  }

  async addNewScore(scores: Scores, macAddress: string) {
    const id = (await this.getDeviceId(macAddress))!;
    await prisma.score.create({
      data: { ...scores, deviceTrafficId: id },
    });
  }
}
export default DeviceTrafficStore;
