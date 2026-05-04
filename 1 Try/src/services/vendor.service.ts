import vendorLookupRules from "../../config/vendor.lookup.rules/vendor.lookup.json" with { type: "json" };

class VendorService {
  vendorLookup(macAddress: string) {
    let macPrefix = macAddress.toUpperCase().split(":").slice(0, 3).join(":");

    for (const vendor of vendorLookupRules.rules) {
      if ("prefixes" in vendor.conditions) {
      for (const prefix of vendor.conditions.prefixes)
        if (macPrefix === prefix) {
          return vendor.id;
        }
      }
    }
    return "unknown";
  }
}

export default VendorService;
