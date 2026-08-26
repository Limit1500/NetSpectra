import { normalizeHostname } from "../utils/normalizations.utils";
import DeviceDatabaseService from "./deviceDatabase.service";
import ScoreService from "./score.service";
import VendorService from "./vendor.service";

async function processData(
  macAddress: string,
  hostname: string,
  service: string,
  protocol: string,
  port: string
) {
  hostname = normalizeHostname(hostname);

  const vendor = VendorService.getVendorByMac(macAddress);

  if (!(await DeviceDatabaseService.getDeviceByMac(macAddress))) {
    await DeviceDatabaseService.createDevice(macAddress, vendor);
  }

  const newScores = ScoreService.getScores(
    vendor,
    hostname,
    service,
    protocol,
    port
  );

  let { oldScores, lastDecay } =
    await DeviceDatabaseService.getOldScoresAndLastDecay(macAddress);

  const now = new Date();
  if (
    now.getTime() - lastDecay.getTime() >=
    Number(process.env.DECAY_INTERVAL)
  ) {
    ScoreService.decayScores(oldScores);
    lastDecay = now;
  }

  const updatedScores = ScoreService.sumScoresSets(newScores, oldScores);

  const { device, maxScore } = ScoreService.getDeviceByScore(updatedScores);
  const scoresSum = ScoreService.getScoresSum(updatedScores);

  const confidence = scoresSum > 0 ? maxScore / scoresSum : 0;

  await DeviceDatabaseService.postUpdatedData(
    macAddress,
    updatedScores,
    device,
    lastDecay,
    confidence
  );
}

export default processData;
