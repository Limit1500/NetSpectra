const trafficDataSchema = {
  body: {
    type: "object",
    additionalProperties: false,
    required: ["macAddress", "hostname", "service", "protocol", "port"],
    properties: {
      macAddress: {
        type: "string",
        pattern: "^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$",
      },

      hostname: {
        type: "string",
        minLength: 1,
        maxLength: 253,
      },
      service: {
        type: "string",
        minLength: 1,
        maxLength: 100,
      },

      protocol: {
        type: "string",
      },

      port: {
        type: "string",
        pattern: "^[0-9]+$",
      },
    },
  },
};

export default trafficDataSchema;
