import { scoringRules } from "../../config/device.scoring.rules/scoring.rules.js";
import { Scores } from "../models/traffic.models.js";
import type { trafficData } from "../types/traffic.interfaces.js";

class ScoringService {
  calculateDevicePoints(trafficData: trafficData) {
    let deviceScores = new Scores();

    for (const rule of scoringRules.privateIpRules) {
      if (trafficData.srcIp.startsWith(rule.match.value)) {
        for (const key in rule.scores) {
          deviceScores[key as keyof Scores] +=
            rule.scores[key as keyof Scores]!;
        }
      }
    }

    return deviceScores;
  }
}

export default ScoringService;
