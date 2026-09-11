import VendorService from "./services/vendor";
import DatabaseDeviceService from "../../database/device/service";
import ScoreService from "./services/score";
import { normalizeHostname, normalizeVendor } from "./services/normalization";
import { env } from "../../config/env";
import { getConfidence } from "./services/helpers";

class TrafficService {
  static async processData(
    macAddress: string,
    hostname: string,
    service: string,
    protocol: string,
    port: string
  ) {
    const vendor = VendorService.getVendorByMac(macAddress);

    const normalizedHostname = normalizeHostname(hostname);
    const normalizedVendor = normalizeVendor(vendor);

    const deviceIsRegistered: boolean =
      (await DatabaseDeviceService.getDeviceByMac(macAddress)) ? true : false;

    if (deviceIsRegistered === false) {
      await DatabaseDeviceService.createDevice(macAddress, normalizedVendor);
    }

    const trafficScores = ScoreService.applyRulesAndGetScores(
      normalizedVendor,
      normalizedHostname,
      service,
      protocol,
      port
    );

    let { databaseDeviceScores, lastDecay } =
      await DatabaseDeviceService.getSavedScoresAndLastDecay(macAddress);

    const now = new Date();
    if (now.getTime() - lastDecay.getTime() >= Number(env.DECAY_INTERVAL)) {
      ScoreService.decayScores(databaseDeviceScores);
      lastDecay = now;
    }

    const updatedScores = ScoreService.sumScoresSets(
      trafficScores,
      databaseDeviceScores
    );

    const { device, maxScore } = ScoreService.getDeviceByScores(updatedScores);
    const scoresSum = ScoreService.getScoresSum(updatedScores);

    const confidence = getConfidence(maxScore, scoresSum);

    await DatabaseDeviceService.postUpdatedData(
      macAddress,
      updatedScores,
      device,
      lastDecay,
      confidence
    );
  }
}
export default TrafficService;
