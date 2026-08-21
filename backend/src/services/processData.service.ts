import DatabaseService from "./database.service";
import ScoreService from "./score.service";
import VendorService from "./vendor.service";

async function processData(
  macAddress: string,
  hostname: string,
  service: string,
  protocol: string,
  port: string,
) {
  const vendor = VendorService.getVendorByMac(macAddress);

  if (!(await DatabaseService.getDeviceByMac(macAddress))) {
    await DatabaseService.createDevice(macAddress, vendor);
  }

  const newScores = ScoreService.getScores(
    vendor,
    hostname,
    service,
    protocol,
    port,
  );

  const updatedData = await DatabaseService.getUpdatedData(
    macAddress,
    newScores!,
  );

  const deviceType = ScoreService.getDeviceByScore(updatedData!);
  updatedData!.deviceType = deviceType;

  await DatabaseService.postUpdatedData(macAddress, updatedData!);
}

export default processData;
