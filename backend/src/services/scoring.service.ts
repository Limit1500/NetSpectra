import { Scores } from "../models/traffic.models.js";
import type { trafficData } from "../types/traffic.interfaces.js";

class ScoringService {
  calculateDevicePoints(trafficData: trafficData) {
    let deviceScores = new Scores();

    return deviceScores;
  }
}

export default ScoringService;
