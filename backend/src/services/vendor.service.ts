import vendorsJson from "../normalized-vendors.json";

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

  private normalizeVendor(vendor: string) {
    return (
      vendor
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .charAt(0)
        .toUpperCase() + vendor.slice(1)
    );
  }

  public getVendorByMac(macAddress: string) {
    return this.normalizeVendor(
      this.getVendorByPrefix(this.getPrefixByMac(macAddress))
    );
  }
}

export default new VendorService();
