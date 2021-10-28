import log from "../src";

describe("Console log tests", () => {
  const logSpy = jest.spyOn(global.console, "log");
  it("Should print correctly", () => {
    log.debug("Test string1");
    const strMatch1 = expect.stringMatching(" print.test.ts:6:9: %s");
    expect(logSpy).toHaveBeenCalledWith(strMatch1, "Test string1");

    log.info("Test string2");
    const strMatch2 = expect.stringMatching(" print.test.ts:10:9: %s");
    expect(logSpy).toHaveBeenCalledWith(strMatch2, "Test string2");

    log.warn("Test string3");
    const strMatch3 = expect.stringMatching(" print.test.ts:14:9: %s");
    expect(logSpy).toHaveBeenCalledWith(strMatch3, "Test string3");

    log.error("Test string4");
    const strMatch4 = expect.stringMatching(" print.test.ts:18:9: %s");
    expect(logSpy).toHaveBeenCalledWith(strMatch4, "Test string4");
  });
});
