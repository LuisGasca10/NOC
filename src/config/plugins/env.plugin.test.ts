import { envs } from "./envs.plugin";

describe("envs.plugin.ts", () => {
  test("should return env options", () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SECRET_KEY: "loafbiamymkoieec",
      MAILER_EMAIL: "gascag517@gmail.com",
      PROD: true,
      MAILER_SERVICE: "gmail",
      MONGO_URL: "mongodb://guillermo:123456789@localhost:27017",
      MONGO_DB_NAME: "NOC-TEST",
      MONGO_USER: "guillermo",
      MONGO_PASS: "123456789",
    });
  });

  test("should return error if not found env", async () => {
    jest.resetModules();
    process.env.PORT = "ABS";
    try {
      await import("./envs.plugin");
      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain('env-var: "PORT" should be a valid integer');
    }
  });
});
