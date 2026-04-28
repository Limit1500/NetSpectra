const trafficValidation = {
  body: {
    type: "object",
    required: ["src_ip", "src_mac", "dst_ip", "dst_port", "protocol", "bytes"],
    properties: {
      src_ip: {
        type: "string",
        format: "ipv4",
      },
      src_mac: {
        type: "string",
        pattern: "^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$",
      },
      dst_ip: {
        type: "string",
        format: "ipv4",
      },
      dst_port: {
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
