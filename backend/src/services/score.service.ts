import vendorRules from "../rules/vendor.rules.json";
import hostnameRules from "../rules/hostname.rules.json";
import serviceRules from "../rules/service.rules.json";
import protocolRules from "../rules/protocol.rules.json";
import portRules from "../rules/port.rules.json";
import { matchString } from "../utils";
import { DeviceType, MatchOperator } from "../types";

class ScoreService {
  private static applyRules(
    savedScores: Record<string, Partial<Record<DeviceType, number>>>,
    operator: MatchOperator,
    reqData: string,
    scores: Record<DeviceType, number>,
  ) {
    for (const [key, value] of Object.entries(savedScores)) {
      if (matchString(reqData, operator, key)) {
        for (const [key, score] of Object.entries(value)) {
          scores[key as DeviceType] += score;
        }
      }
    }
    return scores;
  }

  static getDeviceByScore(scores: Record<DeviceType, number>): DeviceType {
    let device = "Unknown" as DeviceType;
    for (const [key, number] of Object.entries(scores)) {
      if (scores[device as DeviceType] < number) {
        device = key as DeviceType;
      }
    }
    return device;
  }

  static getScores(
    vendor: string,
    hostname: string,
    service: string,
    protocol: string,
    port: string,
  ) {
    let scores = Object.fromEntries(
      Object.entries(DeviceType).map(([key]) => [key, 0]),
    ) as Record<DeviceType, number>;
    ScoreService.applyRules(vendorRules, "CONTAINS", vendor, scores);
    ScoreService.applyRules(hostnameRules, "CONTAINS", hostname, scores);
    ScoreService.applyRules(serviceRules, "EQUALS", service, scores);
    ScoreService.applyRules(protocolRules, "EQUALS", protocol, scores);
    ScoreService.applyRules(portRules, "EQUALS", port, scores);
    return scores;
  }
}

export default ScoreService;
