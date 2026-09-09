import { env } from "process";
import vendorService from "./services/vendor";
import DeviceDatabaseService from "../../services/database/device";
import ScoreService from "./services/score";
import { getConfidence } from "../../common/utils/confidence.utils";
import {
  normalizeHostname,
  normalizeVendor,
} from "../../common/normalization/traffic";

class TrafficService {
  static async processData(
    macAddress: string,
    hostname: string,
    service: string,
    protocol: string,
    port: string
  ) {
    const vendor = vendorService.getVendorByMac(macAddress);

    const normalizedHostname = normalizeHostname(hostname);
    const normalizedVendor = normalizeVendor(vendor);

    const deviceIsRegistered: boolean =
      (await DeviceDatabaseService.getDeviceByMac(macAddress)) ? true : false;

    if (deviceIsRegistered === false) {
      await DeviceDatabaseService.createDevice(macAddress, normalizedVendor);
    }

    const requestScores = ScoreService.applyRulesAndGetScores(
      normalizedVendor,
      normalizedHostname,
      service,
      protocol,
      port
    );

    let { dbSavedScores, lastDecay } =
      await DeviceDatabaseService.getSavedScoresAndLastDecay(macAddress);

    const now = new Date();
    if (now.getTime() - lastDecay.getTime() >= Number(env.DECAY_INTERVAL)) {
      ScoreService.decayScores(dbSavedScores);
      lastDecay = now;
    }

    const updatedScores = ScoreService.sumScoresSets(
      requestScores,
      dbSavedScores
    );

    const { device, maxScore } = ScoreService.getDeviceByScore(updatedScores);
    const scoresSum = ScoreService.getScoresSum(updatedScores);

    const confidence = getConfidence(maxScore, scoresSum);

    await DeviceDatabaseService.postUpdatedData(
      macAddress,
      updatedScores,
      device,
      lastDecay,
      confidence
    );
  }
}
export default TrafficService;
