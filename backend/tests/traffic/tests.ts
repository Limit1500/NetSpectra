import { app } from "../src/app";
import { describe, it, expect } from "vitest";

describe("POST /traffic", () => {
  it("should accept request", async () => {
    const response = await app.inject({
      method: "post",
      url: "/traffic",
      headers: {
        "api-key": process.env.TRAFFIC_API_KEY!,
      },
      body: {
        macAddress: "AA:BB:CC:DD:EE:FF",
        hostname: "DESKTOP-TEST",
        service: "https",
        protocol: "TCP",
        port: "443",
      },
    });

    expect(response.statusCode).toBe(200);
  });

  it("should reject request: wrong api key", async () => {
    const response = await app.inject({
      method: "post",
      url: "/traffic",
      headers: {
        "api-key": "wrong api key",
      },
      body: {
        macAddress: "AA:BB:CC:DD:EE:FF",
        hostname: "DESKTOP-TEST",
        service: "https",
        protocol: "TCP",
        port: "443",
      },
    });

    expect(response.statusCode).toBe(401);
  });

  it("should reject request: api key missing", async () => {
    const response = await app.inject({
      method: "post",
      url: "/traffic",
      body: {
        macAddress: "AA:BB:CC:DD:EE:FF",
        hostname: "DESKTOP-TEST",
        service: "https",
        protocol: "TCP",
        port: "443",
      },
    });

    expect(response.statusCode).toBe(401);
  });

  it("should reject request: missing data", async () => {
    const response = await app.inject({
      method: "post",
      url: "/traffic",
      body: {
        macAddress: "AA:BB:CC:DD:EE:FF",
        hostname: "DESKTOP-TEST",
        service: "https",
        protocol: "TCP",
      },
    });

    expect(response.statusCode).toBe(400);
  });

  it("should reject request: invalid data", async () => {
    const response = await app.inject({
      method: "post",
      url: "/traffic",
      body: {
        macAddress: "AABBCCDDEEFF",
        hostname: "DESKTOP-TEST",
        service: "https",
        protocol: "TCP",
        port: "443",
      },
    });

    expect(response.statusCode).toBe(400);
  });
});
