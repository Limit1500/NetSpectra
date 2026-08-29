import vendorsJson from "../normalized-vendors.json";
import { normalizeVendor } from "../utils/normalizations.utils";

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

  public getNormalizedVendorByMac(macAddress: string) {
    return normalizeVendor(
      this.getVendorByPrefix(this.getPrefixByMac(macAddress)),
    );
  }
}

export default new VendorService();
