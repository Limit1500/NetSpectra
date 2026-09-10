import vendorRules from "../../../../rules/vendor.rules.json";
import hostnameRules from "../../../../rules/hostname.rules.json";
import serviceRules from "../../../../rules/service.rules.json";
import protocolRules from "../../../../rules/protocol.rules.json";
import portRules from "../../../../rules/port.rules.json";
import { MatchOperator, DeviceTypes } from "../../traffic/types";
import { env } from "process";
import { matchString } from "../../../common/utils/string";

class ScoreService {
  private static applyRules(
    rules: Record<string, Partial<Record<DeviceTypes, number>>>,
    operator: MatchOperator,
    data: string,
    scores: Record<DeviceTypes, number>
  ) {
    for (const [key, value] of Object.entries(rules)) {
      if (matchString(data, operator, key)) {
        for (const [deviceType, score] of Object.entries(value)) {
          scores[deviceType as DeviceTypes] += score;
        }
      }
    }
  }

  static getScoresSum(scores: Record<DeviceTypes, number>): number {
    let sum = 0;
    for (const key of Object.values(DeviceTypes)) {
      sum += scores[key];
    }
    return sum;
  }

  static applyRulesAndGetScores(
    vendor: string,
    hostname: string,
    service: string,
    protocol: string,
    port: string
  ): Record<DeviceTypes, number> {
    const scores = Object.fromEntries(
      Object.values(DeviceTypes).map((deviceType) => [deviceType, 0])
    ) as Record<DeviceTypes, number>;

    this.applyRules(vendorRules, "CONTAINS", vendor, scores);
    this.applyRules(hostnameRules, "CONTAINS", hostname, scores);
    this.applyRules(serviceRules, "EQUALS", service, scores);
    this.applyRules(protocolRules, "EQUALS", protocol, scores);
    this.applyRules(portRules, "EQUALS", port, scores);

    return scores;
  }

  static getDeviceByScores(scores: Record<DeviceTypes, number>) {
    let device = DeviceTypes.Unknown;
    let maxScore = 0;
    for (const [key, score] of Object.entries(scores)) {
      const deviceType = key as DeviceTypes;

      if (maxScore < score) {
        device = deviceType;
        maxScore = score;
      }
    }

    return { device, maxScore };
  }

  static sumScoresSets(
    newScores: Record<DeviceTypes, number>,
    oldScores: Record<DeviceTypes, number>
  ): Record<DeviceTypes, number> {
    const updatedScores = {} as Record<DeviceTypes, number>;
    for (const key of Object.values(DeviceTypes)) {
      updatedScores[key] = newScores[key] + oldScores[key];
    }
    return updatedScores;
  }

  static decayScores(
    scores: Record<DeviceTypes, number>
  ): Record<DeviceTypes, number> {
    const decayedScores = {} as Record<DeviceTypes, number>;

    for (const key of Object.values(DeviceTypes)) {
      decayedScores[key] = scores[key] * Number(env.DECAY_MULTIPLIER);
    }
    return decayedScores;
  }
}

export default ScoreService;
