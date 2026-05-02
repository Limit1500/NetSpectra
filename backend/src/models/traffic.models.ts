import type VendorService from "../services/vendor.service.js";

export class TrafficDevice {
  macAddress: string;
  vendor: string;

  constructor(macAddress: string, VendorService: VendorService) {
    this.macAddress = macAddress;
    this.vendor = VendorService.vendorLookup(macAddress);
  }
}

export class Scores {
  iotScore = 0;
  mobileScore = 0;
  desktopScore = 0;
  tvScore = 0;
}
