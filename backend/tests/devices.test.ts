import { app } from "../src/app";
import { describe, it, expect } from "vitest";

describe("GET /devices", () => {
  it("should accept request", async () => {
    await app.ready();

    const token = app.jwt.sign({
      userId: 1,
      username: "test-user",
    });

    const response = await app.inject({
      method: "get",
      url: "/devices",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const devices = response.json();

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(devices)).toBe(true);
  });

  it("should reject request: invalid token", async () => {
    const response = await app.inject({
      method: "get",
      url: "/devices",
      headers: {
        authorization: `Bearer randomstring`,
      },
    });

    expect(response.statusCode).toBe(401);
  });

  it("should reject request: token missing", async () => {
    const response = await app.inject({
      method: "get",
      url: "/devices",
    });

    expect(response.statusCode).toBe(401);
  });
});
