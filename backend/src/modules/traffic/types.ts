export type trafficDataType = {
  macAddress: string;
  hostname: string;
  service: string;
  protocol: string;
  port: string;
};

export type MatchOperator = "EQUALS" | "CONTAINS" | "STARTS_WITH" | "ENDS_WITH";
