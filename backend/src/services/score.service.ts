import vendorRules from "../scoringRules/vendor.rules.json";
import hostnameRules from "../scoringRules/hostname.rules.json";
import serviceRules from "../scoringRules/service.rules.json";
import protocolRules from "../scoringRules/protocol.rules.json";
import portRules from "../scoringRules/port.rules.json";
import { matchString } from "../utils/string.utils";
import { DeviceType, MatchOperator } from "../types/device.types";
import { env } from "process";

class ScoreService {
  private static applyRules(
    savedScores: Record<string, Partial<Record<DeviceType, number>>>,
    operator: MatchOperator,
    reqData: string,
    scores: Record<DeviceType, number>
  ): Record<DeviceType, number> {
    for (const [key, value] of Object.entries(savedScores)) {
      if (matchString(reqData, operator, key)) {
        for (const [deviceType, score] of Object.entries(value)) {
          scores[deviceType as DeviceType] += score;
        }
      }
    }

    return scores;
  }

  static getScoresSum(scores: Record<DeviceType, number>): number {
    let sum = 0;
    for (const key of Object.values(DeviceType)) {
      sum += scores[key];
    }
    return sum;
  }

  static getScores(
    vendor: string,
    hostname: string,
    service: string,
    protocol: string,
    port: string
  ): Record<DeviceType, number> {
    const scores = Object.fromEntries(
      Object.values(DeviceType).map((deviceType) => [deviceType, 0])
    ) as Record<DeviceType, number>;

    this.applyRules(vendorRules, "CONTAINS", vendor, scores);
    this.applyRules(hostnameRules, "CONTAINS", hostname, scores);
    this.applyRules(serviceRules, "EQUALS", service, scores);
    this.applyRules(protocolRules, "EQUALS", protocol, scores);
    this.applyRules(portRules, "EQUALS", port, scores);

    return scores;
  }

  static getDeviceByScore(scores: Record<DeviceType, number>) {
    let device = DeviceType.Unknown;
    let maxScore = 0;
    for (const [key, score] of Object.entries(scores)) {
      const deviceType = key as DeviceType;

      if (maxScore < score) {
        device = deviceType;
        maxScore = score;
      }
    }

    return { device, maxScore };
  }

  static sumScoresSets(
    newScores: Record<DeviceType, number>,
    oldScores: Record<DeviceType, number>
  ): Record<DeviceType, number> {
    const updatedScores = {} as Record<DeviceType, number>;
    for (const key of Object.values(DeviceType)) {
      updatedScores[key] = newScores[key] + oldScores[key];
    }
    return updatedScores;
  }

  static decayScores(
    scores: Record<DeviceType, number>
  ): Record<DeviceType, number> {
    for (const key of Object.values(DeviceType)) {
      scores[key] *= Number(env.DECAY_MULTIPLIER);
    }
    return scores;
  }
}

export default ScoreService;
