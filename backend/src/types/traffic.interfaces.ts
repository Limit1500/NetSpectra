export interface trafficData {
  src_ip: string;
  src_mac: string;
  dst_ip: string;
  dst_port: number;
  protocol: string;
  bytes: number;
}

export interface trafficResult {
  deviceType: string;
  confidence: number;
}
