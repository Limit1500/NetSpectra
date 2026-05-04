const trafficValidation = {
  body: {
    type: "object",
    required: ["srcIp", "srcMac", "dstIp", "dstPort", "protocol", "bytes"],
    properties: {
      srcIp: {
        type: "string",
        format: "ipv4",
      },
      srcMac: {
        type: "string",
        pattern: "^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$",
      },
      dstIp: {
        type: "string",
        format: "ipv4",
      },
      dstPort: {
        type: "integer",
        minimum: 1,
        maximum: 65535,
      },
      protocol: {
        type: "string",
      },
      bytes: {
        type: "integer",
        minimum: 0,
      },
    },
  },
};

export default trafficValidation;
