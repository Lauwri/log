import log from "../src";
import { Colors } from "../src/constants";

describe("Console log tests", () => {
  const logSpy = jest.spyOn(global.console, "log");
  it("Should print source correctly", () => {
    log.debug("Test string1");
    const strMatch1 = expect.stringMatching(" print.test.ts:7:9: %s");
    expect(logSpy).toHaveBeenCalledWith(
      strMatch1,
      "Test string1",
      Colors.Reset
    );

    log.info("Test string2");
    const strMatch2 = expect.stringMatching(" print.test.ts:15:9: %s");
    expect(logSpy).toHaveBeenCalledWith(
      strMatch2,
      "Test string2",
      Colors.Reset
    );

    log.warn("Test string3");
    const strMatch3 = expect.stringMatching(" print.test.ts:23:9: %s");
    expect(logSpy).toHaveBeenCalledWith(
      strMatch3,
      "Test string3",
      Colors.Reset
    );

    log.error("Test string4");
    const strMatch4 = expect.stringMatching(" print.test.ts:31:9: %s");
    expect(logSpy).toHaveBeenCalledWith(
      strMatch4,
      "Test string4",
      Colors.Reset
    );
  });
  const testVariables = [
    undefined,
    null,
    123,
    "test",
    { a: [1, 2] },
    [1, 2, 3],
    [{ a: "test" }, 1, 2],
    true,
    false,
    NaN,
    0,
    -1,
  ];

  it("Should print variables correctly", () => {
    testVariables.forEach((variable) => {
      log.debug(variable);
      expect(logSpy).toHaveBeenLastCalledWith(
        expect.any(String),
        variable,
        Colors.Reset
      );

      log.info(variable);
      expect(logSpy).toHaveBeenLastCalledWith(
        expect.any(String),
        variable,
        Colors.Reset
      );

      log.warn(variable);
      expect(logSpy).toHaveBeenLastCalledWith(
        expect.any(String),
        variable,
        Colors.Reset
      );

      log.error(variable);
      expect(logSpy).toHaveBeenLastCalledWith(
        expect.any(String),
        variable,
        Colors.Reset
      );
    });
  });

  it("Should print multiple arguments correctly", () => {
    log.debug(...testVariables);
    expect(logSpy).toHaveBeenLastCalledWith(
      expect.any(String),
      ...testVariables,
      Colors.Reset
    );

    log.info(...testVariables);
    expect(logSpy).toHaveBeenLastCalledWith(
      expect.any(String),
      ...testVariables,
      Colors.Reset
    );

    log.warn(...testVariables);
    expect(logSpy).toHaveBeenLastCalledWith(
      expect.any(String),
      ...testVariables,
      Colors.Reset
    );

    log.error(...testVariables);
    expect(logSpy).toHaveBeenLastCalledWith(
      expect.any(String),
      ...testVariables,
      Colors.Reset
    );
  });
});
