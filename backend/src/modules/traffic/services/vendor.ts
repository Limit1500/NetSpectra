import vendorsJson from "../../../../vendors/normalized-vendors.json";

class VendorService {
  private getPrefixByMac(macAddress: string) {
    return macAddress
      .toUpperCase()
      .replace(/[^A-F0-9]/g, "")
      .slice(0, 6);
  }

  private getVendorByPrefix(prefix: string) {
    const allVendors: Record<string, string> = vendorsJson;
    return allVendors[prefix] !== undefined ? allVendors[prefix] : "Unknown";
  }

  public getVendorByMac(macAddress: string) {
    const prefix = this.getPrefixByMac(macAddress);
    const vendor = this.getVendorByPrefix(prefix);

    return vendor;
  }
}

export default new VendorService();
