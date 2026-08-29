import { env } from "process";
import { normalizeHostname } from "../utils/normalizations.utils";
import DeviceDatabaseService from "./deviceDatabase.service";
import ScoreService from "./score.service";
import VendorService from "./vendor.service";
import { getConfidence } from "../utils/confidence.utils";

async function processData(
  macAddress: string,
  hostname: string,
  service: string,
  protocol: string,
  port: string,
) {
  const normalizedHostname = normalizeHostname(hostname);
  const normalizedVendor = VendorService.getNormalizedVendorByMac(macAddress);

  const deviceIsRegistered: boolean =
    (await DeviceDatabaseService.getDeviceByMac(macAddress)) ? true : false;

  if (deviceIsRegistered === false) {
    await DeviceDatabaseService.createDevice(macAddress, normalizedVendor);
  }

  const requestScores = ScoreService.applyRulesByDataAndGetScores(
    normalizedVendor,
    normalizedHostname,
    service,
    protocol,
    port,
  );

  let { dbSavedScores, lastDecay } =
    await DeviceDatabaseService.getDbSavedScoresAndLastDecay(macAddress);

  const now = new Date();
  if (now.getTime() - lastDecay.getTime() >= Number(env.DECAY_INTERVAL)) {
    ScoreService.decayScores(dbSavedScores);
    lastDecay = now;
  }

  const updatedScores = ScoreService.sumScoresSets(
    requestScores,
    dbSavedScores,
  );

  const { device, maxScore } = ScoreService.getDeviceByScore(updatedScores);
  const scoresSum = ScoreService.getScoresSum(updatedScores);

  const confidence = getConfidence(maxScore, scoresSum);

  await DeviceDatabaseService.postUpdatedData(
    macAddress,
    updatedScores,
    device,
    lastDecay,
    confidence,
  );
}

export default processData;
