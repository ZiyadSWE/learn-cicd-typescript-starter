import { describe, expect, it } from "vitest";
import { getAPIKey } from "../api/auth.js";

describe("getAPIKey", () => {
  it("returns the API key from a valid authorization header", () => {
    expect(getAPIKey({ authorization: "ApiKey secret-key" })).toBe(
      "secret-key",
    );
  });

  it.each([
    ["missing header", {}],
    ["wrong authentication scheme", { authorization: "Bearer secret-key" }],
    ["missing API key", { authorization: "ApiKey" }],
    ["incorrect scheme casing", { authorization: "apikey secret-key" }],
  ])("returns null for %s", (_, headers) => {
    expect(getAPIKey(headers)).toBeNull();
  });

  it("handles multiple spaces before the API key", () => {
    expect(getAPIKey({ authorization: "ApiKey   secret-key" })).toBe(
      "secret-key",
    );
  });
});
