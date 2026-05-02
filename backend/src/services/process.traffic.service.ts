import type DeviceTrafficStore from "../db/device.traffic.store.js";
import type { trafficData } from "../types/traffic.interfaces.js";
import type MacService from "./mac.service.js";
import ScoringService from "./scoring.service.js";
import type VendorService from "./vendor.service.js";

class ProcessTrafficService {
  constructor(
    private ScoringService: ScoringService,
    private VendorService: VendorService,
    private DeviceTrafficStore: DeviceTrafficStore,
    private MacService: MacService
  ) {}

  async processData(data: trafficData) {
    const macAddress = data.srcMac;

    if ((await this.DeviceTrafficStore.getDeviceByMac(macAddress)) === null) {
      const vendor = this.VendorService.vendorLookup(macAddress);
      await this.DeviceTrafficStore.addNewDevice(macAddress, vendor);
    }

    const deviceScores = this.ScoringService.calculateDevicePoints(data);

    await this.DeviceTrafficStore.addNewScore(deviceScores, macAddress);

    return {
      device: await this.DeviceTrafficStore.getDeviceByMac(macAddress),
      avgPoints: await this.DeviceTrafficStore.getDeviceScoresAvgByMac(
        macAddress
      ),
    };
  }
}

export default ProcessTrafficService;
