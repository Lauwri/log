import log from "../src";
import { Colors } from "../src/constants";

describe("Console log tests", () => {
  const logSpy = jest.spyOn(global.console, "log");
  const debugSpy = jest.spyOn(global.console, "debug");
  const warnSpy = jest.spyOn(global.console, "warn");
  const errorSpy = jest.spyOn(global.console, "error");
  const expectTag = expect.stringMatching("This is a custom tag:");

  it("Should print source correctly", () => {
    log.debugc("This is a custom tag:")("Test string1");
    expect(debugSpy).toHaveBeenCalledWith(
      expectTag,
      "Test string1",
      Colors.Reset
    );

    log.infoc("This is a custom tag:")("Test string2");
    expect(logSpy).toHaveBeenCalledWith(
      expectTag,
      "Test string2",
      Colors.Reset
    );

    log.warnc("This is a custom tag:")("Test string3");
    expect(warnSpy).toHaveBeenCalledWith(
      expectTag,
      "Test string3",
      Colors.Reset
    );

    log.errorc("This is a custom tag:")("Test string4");
    expect(errorSpy).toHaveBeenCalledWith(
      expectTag,
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
      log.debugc("This is a custom tag:")(variable);
      expect(debugSpy).toHaveBeenLastCalledWith(
        expectTag,
        variable,
        Colors.Reset
      );

      log.infoc("This is a custom tag:")(variable);
      expect(logSpy).toHaveBeenLastCalledWith(
        expectTag,
        variable,
        Colors.Reset
      );

      log.warnc("This is a custom tag:")(variable);
      expect(warnSpy).toHaveBeenLastCalledWith(
        expectTag,
        variable,
        Colors.Reset
      );

      log.errorc("This is a custom tag:")(variable);
      expect(errorSpy).toHaveBeenLastCalledWith(
        expectTag,
        variable,
        Colors.Reset
      );
    });
  });

  it("Should print multiple arguments correctly", () => {
    log.debugc("This is a custom tag:")(...testVariables);
    expect(debugSpy).toHaveBeenLastCalledWith(
      expectTag,
      ...testVariables,
      Colors.Reset
    );

    log.infoc("This is a custom tag:")(...testVariables);
    expect(logSpy).toHaveBeenLastCalledWith(
      expectTag,
      ...testVariables,
      Colors.Reset
    );

    log.warnc("This is a custom tag:")(...testVariables);
    expect(warnSpy).toHaveBeenLastCalledWith(
      expectTag,
      ...testVariables,
      Colors.Reset
    );

    log.errorc("This is a custom tag:")(...testVariables);
    expect(errorSpy).toHaveBeenLastCalledWith(
      expectTag,
      ...testVariables,
      Colors.Reset
    );
  });
});
