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

  const deviceData = await DeviceDatabaseService.getOldScoresAndUpdatesNumber(
    macAddress
  );

  const updatesNumber = deviceData.updates;
  let oldScores = deviceData.oldScores;

  if (updatesNumber % Number(process.env.UPDATES_LIMIT) == 0) {
    oldScores = ScoreService.decayScores(oldScores);
  }

  const updatedScores = ScoreService.getSumScores(newScores, oldScores);

  const deviceType = ScoreService.getDeviceByScore(updatedScores);

  await DeviceDatabaseService.postUpdatedData(
    macAddress,
    updatedScores,
    deviceType
  );
}

export default processData;
