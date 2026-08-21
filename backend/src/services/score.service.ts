import { DeviceType, MatchOperator } from "../types";
import vendorRules from "../rules/vendor.rules.json";
import hostnameRules from "../rules/hostname.rules.json";
import serviceRules from "../rules/service.rules.json";
import protocolRules from "../rules/protocol.rules.json";
import portRules from "../rules/port.rules.json";
import { matchString, normalizeString } from "../utils";

class ScoreService {
  private scores: Record<DeviceType, number>;

  private vendor: string;
  private hostname: string;
  private service: string;
  private protocol: string;
  private port: string;

  private addScores(
    savedScores: Record<string, Record<string, number>>,
    operator: MatchOperator,
    reqData: string,
  ) {
    for (const [key, value] of Object.entries(savedScores)) {
      if (matchString(reqData, operator, key)) {
        for (const [key, score] of Object.entries(value)) {
          this.scores[key as DeviceType] += score;
        }
      }
    }
  }

  private getDeviceByScore() {
    let device = "Unknown";
    for (const [key, number] of Object.entries(this.scores)) {
      if (this.scores[device as DeviceType] < number) {
        device = key;
      }
    }
    return device;
  }

  private applyRules() {
    this.addScores(vendorRules, "CONTAINS", this.vendor);
    this.addScores(hostnameRules, "CONTAINS", this.hostname);
    this.addScores(serviceRules, "EQUALS", this.service);
    this.addScores(protocolRules, "EQUALS", this.protocol);
    this.addScores(portRules, "EQUALS", this.port);
  }

  public static getDeviceType(
    vendor: string,
    hostname: string,
    service: string,
    protocol: string,
    port: string,
  ) {
    const scores = new ScoreService(vendor, hostname, service, protocol, port);
    scores.applyRules();
    return scores.getDeviceByScore();
  }

  constructor(
    vendor: string,
    hostname: string,
    service: string,
    protocol: string,
    port: string,
  ) {
    this.scores = {} as Record<DeviceType, number>;
    this.vendor = vendor;
    this.hostname = normalizeString(hostname);
    this.service = normalizeString(service).split("._")[0];
    this.protocol = normalizeString(protocol);
    this.port = port;

    for (const value of Object.values(DeviceType)) {
      if (typeof value === "string") {
        this.scores[value] = 0;
      }
    }
  }
}

export default ScoreService;
