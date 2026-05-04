import bytesBehaviorRules from "../device.scoring.rules/bytes.behavior.json";
import bytesRangeRules from "../device.scoring.rules/bytes.range.rules.json";
import macAddressRules from "../device.scoring.rules/mac.adress.rules.json";
import portsRules from "../device.scoring.rules/ports.rules.json";
import privateIpRulles from "../device.scoring.rules/private.ip.rules.json";
import protocolRules from "../device.scoring.rules/protocol.rules.json";
import publicDnsRulles from "../device.scoring.rules/public.dns.rules.json";

export const scoringRules = {
  ...bytesBehaviorRules,
  ...bytesRangeRules,
  ...macAddressRules,
  ...portsRules,
  ...privateIpRulles,
  ...protocolRules,
  ...publicDnsRulles,
};
