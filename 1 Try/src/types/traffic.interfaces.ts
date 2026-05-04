import type { Scores } from "../models/traffic.models.js";

export type trafficData = {
  srcIp: string;
  srcMac: string;
  dstIp: string;
  dstPort: number;
  protocol: string;
  bytes: number;
};

export type Rule = {
  name: string;
  match: {
    type: string;
    value: string;
  };
  scores: Partial<Scores>;
};
