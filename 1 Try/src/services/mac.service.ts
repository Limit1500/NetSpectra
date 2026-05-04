import { prisma } from "../db/prisma.js";

class MacService {
  async returnStatsByMac(macAddress: string) {
    return await prisma.score.aggregate({
      where: {
        deviceTraffic: {
          macAddress: macAddress,
        },
      },
      _sum: {
        iotScore: true,
        mobileScore: true,
        desktopScore: true,
        tvScore: true,
      },
    });
  }
}

export default MacService;
