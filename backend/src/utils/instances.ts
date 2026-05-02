import DeviceTrafficStore from "../db/device.traffic.store.js";
import MacService from "../services/mac.service.js";
import ProcessTrafficService from "../services/process.traffic.service.js";
import ScoringService from "../services/scoring.service.js";
import VendorService from "../services/vendor.service.js";

export const processTrafficService = new ProcessTrafficService(
  new ScoringService(),
  new VendorService(),
  new DeviceTrafficStore(),
  new MacService()
);
