import { rawResult } from "../models/traffic.models.js";
import type { trafficData } from "../types/traffic.interfaces.js";

import privateIpRules from "../../config/scoring.rules.json/private_ip.rules.json";
import macAdressRules from "../../config/scoring.rules.json/mac_adress.rules.json";
import portRules from "../../config/scoring.rules.json/ports.rules.json";
import protocolRules from "../../config/scoring.rules.json/protocol.rules.json";
import publicDnsRules from "../../config/scoring.rules.json/public_dns.rules.json";
import bytesBehaviorRules from "../../config/scoring.rules.json/bytes_behavior.json";
import bytesRangeRules from "../../config/scoring.rules.json/bytes_range.rules.json";

const trafficService = (data: trafficData) => {
  let result = new rawResult();
};

export default trafficService;
