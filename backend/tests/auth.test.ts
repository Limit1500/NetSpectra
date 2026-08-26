import { app } from "../src/app";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createTestUser, deleteTestUser } from "./helpers/user.helper";

describe("POST /auth/signin", () => {
  it("should accept request", async () => {
    const response = await app.inject({
      method: "post",
      url: "/auth/signin",
      payload: {
        username: "username",
        password: "password",
        email: "example@gmail.com",
      },
    });

    expect(response.statusCode).toBe(200);

    await deleteTestUser();
  });

  it("should reject request: duplicate username / email", async () => {
    await createTestUser();

    const response = await app.inject({
      method: "post",
      url: "/auth/signin",
      payload: {
        username: "username",
        password: "password",
        email: "example@gmail.com",
      },
    });

    expect(response.statusCode).toBe(409);

    await deleteTestUser();
  });

  it("should reject request: invalid payload", async () => {
    const response = await app.inject({
      method: "post",
      url: "/auth/signin",
      payload: {
        username: "username",
        email: "password",
      },
    });

    expect(response.statusCode).toBe(400);
  });
});

describe("POST /auth/login", () => {
  beforeAll(async () => {
    await createTestUser();
  });

  afterAll(async () => {
    await deleteTestUser();
  });

  it("should accept request", async () => {
    const result = await app.inject({
      method: "post",
      url: "/auth/login",
      payload: {
        username: "username",
        password: "password",
      },
    });

    expect(result.statusCode).toBe(200);
  });

  it("should reject request: invalid credentials", async () => {
    const result = await app.inject({
      method: "post",
      url: "/auth/login",
      payload: {
        username: "username",
        password: "wrong-password",
      },
    });

    expect(result.statusCode).toBe(401);
  });
});

describe("POST /auth/logout", () => {
  it("should accept request", async () => {
    const response = await app.inject({
      method: "post",
      url: "/auth/logout",
    });

    expect(response.statusCode).toBe(200);
  });
});
